const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

const { db } = require('../services/firebase');
const { generateReceiptPdf } = require('../services/pdfGenerator');
const { paymentLimiter } = require('../middleware/security');
const { sendDonationEmailReceipt } = require('../services/email');
const { sendDonationConfirmation } = require('../services/whatsapp');

let razorpayClient = null;

try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayClient = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('[Razorpay Service] Connected securely to Razorpay API Gateway.');
  } else {
    throw new Error('Missing Razorpay credentials.');
  }
} catch (error) {
  console.warn(`[Razorpay Service Warning] Initializing local Dev Simulation: ${error.message}`);
}

/**
 * Route: Create dynamic order for a donation checkout
 * POST /api/payments/create-order
 */
router.post('/create-order', paymentLimiter, async (req, res) => {
  const { amount, donorName, email, phone, sevaCategory, panNumber, receivePrasadam, deliveryAddress } = req.body;

  if (!amount || !donorName || !email || !phone || !sevaCategory) {
    return res.status(400).json({ error: 'Required donor fields are missing.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (typeof amount !== 'number' || amount < 1 || amount > 500000) {
    return res.status(400).json({ error: 'Invalid donation amount. Allowed range is ₹1 to ₹5,00,000.' });
  }

  // Convert to paise for Razorpay
  const amountInPaise = Math.round(amount * 100);

  try {
    let orderId = `order_sim_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    let mockPayment = true;

    if (razorpayClient) {
      const order = await razorpayClient.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      });
      orderId = order.id;
      mockPayment = false;
    }

    // Prepare donation record for Firestore
    const donationData = {
      donorName,
      email,
      phone,
      panNumber: panNumber || '',
      sevaCategory,
      amount: Number(amount),
      currency: 'INR',
      razorpayOrderId: orderId,
      status: 'created',
      createdAt: new Date(),
      isSimulated: mockPayment,
      ...(receivePrasadam && { receivePrasadam, deliveryAddress, deliveryStatus: 'Pending' })
    };

    // Save to Firestore
    await db.collection('donations').doc(orderId).set(donationData);

    res.json({
      orderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey123',
      donorName,
      email,
      phone,
      sevaCategory,
      isSimulated: mockPayment
    });

  } catch (error) {
    console.error('Error creating checkout order:', error);
    res.status(500).json({ error: 'Failed to initialize payment checkout.' });
  }
});

/**
 * Route: Raw-body signature verification webhook receiver
 * POST /api/payments/verify-webhook
 */
router.post('/verify-webhook', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Webhook] RAZORPAY_WEBHOOK_SECRET env var is not set.');
    return res.status(500).send('Webhook secret not configured');
  }
  const rawBody = req.body; // Buffer from express.raw middleware

  try {
    let isValid = false;
    let payload = null;

    // Check if it is a simulated offline developer request
    if (!signature && req.headers['x-hkd-dev-simulation'] === 'true') {
      isValid = true;
      payload = JSON.parse(rawBody.toString());
      console.log('[Webhook Simulation] Processing simulated payment webhook...');
    } else if (signature && rawBody) {
      // Live validation using SDK utility
      isValid = validateWebhookSignature(
        rawBody.toString(),
        signature,
        webhookSecret
      );
      payload = JSON.parse(rawBody.toString());
    }

    if (!isValid || !payload) {
      console.warn('[Webhook Warning] Signature validation failed. Payload rejected.');
      return res.status(400).send('Invalid Signature');
    }

    const event = payload.event;
    console.log(`[Webhook Event] Processing event: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      if (!orderId) {
        return res.status(200).send('Event processed without order tracking');
      }

      // Fetch corresponding donation document
      const docRef = db.collection('donations').doc(orderId);
      const doc = await docRef.get();

      if (!doc.exists) {
        console.warn(`[Webhook Warning] No donation record found matching Order ID: ${orderId}`);
        // Create an ad-hoc record from webhook payload to prevent data loss
        await docRef.set({
          donorName: paymentEntity.notes?.donorName || 'Generous Donor',
          email: paymentEntity.email || 'donor@hkd.org',
          phone: paymentEntity.contact || '+910000000000',
          sevaCategory: paymentEntity.notes?.sevaCategory || 'General Gau Seva',
          amount: paymentEntity.amount / 100,
          currency: 'INR',
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          status: 'paid',
          createdAt: new Date(),
          completedAt: new Date(),
          isOrphanedRecord: true
        });
      } else {
        const donation = doc.data();
        if (donation.status === 'paid') {
          console.log(`[Webhook Alert] Order ${orderId} already marked as paid. Skipping hooks.`);
          return res.status(200).send('Payment already processed');
        }

        // Update database record to Paid state
        await docRef.update({
          status: 'paid',
          razorpayPaymentId: paymentId,
          completedAt: new Date()
        });
      }

      // Reload fresh data to build receipt
      const updatedDoc = await docRef.get();
      const freshDonation = updatedDoc.data();
      freshDonation.id = orderId;

      // Create real-time notification
      try {
        await db.collection('cms_notifications').add({
          title: 'New Donation Received',
          message: `${freshDonation.donorName} donated ₹${freshDonation.amount} towards ${freshDonation.sevaCategory}.`,
          type: 'payment',
          read: false,
          createdAt: new Date(),
          link: '/admin'
        });
      } catch (notifErr) {
        console.error('[Notification Error]:', notifErr.message);
      }

      // Generate receipt PDF file in temporary system directory
      const os = require('os');
      const tempReceiptsDir = path.join(os.tmpdir(), 'receipts');
      if (!fs.existsSync(tempReceiptsDir)) {
        fs.mkdirSync(tempReceiptsDir, { recursive: true });
      }
      const pdfPath = path.join(tempReceiptsDir, `receipt_${orderId}.pdf`);
      
      await generateReceiptPdf(freshDonation, pdfPath);
      console.log(`[Webhook PDF] Successfully generated donation certificate PDF: ${pdfPath}`);

      // Dispatch Notifications asynchronously
      sendDonationEmailReceipt(freshDonation, pdfPath).catch(err => 
        console.error('[Webhook Email Trigger Error]:', err.message)
      );

      sendDonationConfirmation(
        freshDonation.phone, 
        freshDonation.donorName, 
        freshDonation.amount, 
        freshDonation.sevaCategory,
        freshDonation.receiptUrl || ''
      ).catch(err => 
        console.error('[Webhook WhatsApp Trigger Error]:', err.message)
      );
    }

    // Acknowledge event successfully received
    res.status(200).send('Webhook verified and processed');

  } catch (error) {
    console.error('Webhook critical error:', error);
    res.status(500).send('Internal verification error');
  }
});

/**
 * Route: Manual checkout verification bypass for dev clients (Test Mode)
 * POST /api/payments/verify-simulated
 */
router.post('/verify-simulated', async (req, res) => {
  const { orderId, paymentId } = req.body;

  if (!orderId || !paymentId) {
    return res.status(400).json({ error: 'Order and Payment references required.' });
  }

  try {
    const docRef = db.collection('donations').doc(orderId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Transaction record not found.' });
    }

    const donation = doc.data();

    // Skip if already updated
    if (donation.status === 'paid') {
      return res.json({ success: true, status: 'paid', alreadyProcessed: true });
    }

    await docRef.update({
      status: 'paid',
      razorpayPaymentId: paymentId,
      completedAt: new Date()
    });

    const updatedDoc = await docRef.get();
    const freshDonation = updatedDoc.data();
    freshDonation.id = orderId;

    // Generate local PDF and trigger dispatch pipelines
    const os = require('os');
    const tempReceiptsDir = path.join(os.tmpdir(), 'receipts');
    if (!fs.existsSync(tempReceiptsDir)) {
      fs.mkdirSync(tempReceiptsDir, { recursive: true });
    }
    const pdfPath = path.join(tempReceiptsDir, `receipt_${orderId}.pdf`);
    await generateReceiptPdf(freshDonation, pdfPath);

    sendDonationEmailReceipt(freshDonation, pdfPath).catch(err => 
      console.error('[Simulated Notification Email Error]:', err.message)
    );

    sendDonationConfirmation(
      freshDonation.phone,
      freshDonation.donorName,
      freshDonation.amount,
      freshDonation.sevaCategory,
      ''
    ).catch(err => 
      console.error('[Simulated Notification WhatsApp Error]:', err.message)
    );

    res.json({ success: true, status: 'paid' });

  } catch (error) {
    console.error('Simulated verification error:', error);
    res.status(500).json({ error: 'Failed to verify transaction.' });
  }
});

module.exports = router;
