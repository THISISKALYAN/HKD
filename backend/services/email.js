const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

/**
 * Creates and configures Nodemailer SMTP transport
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const secure = process.env.SMTP_SECURE === 'true'; // true for port 465, false for other ports
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_APP_PASSWORD;

  if (!host || !user || !pass || user === 'your_email@gmail.com') {
    return null; // SMTP is not configured
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

/**
 * Sends a premium donation confirmation email with a PDF receipt attachment
 * @param {Object} donation - The donation record.
 * @param {string} pdfPath - Absolute path to the generated PDF receipt.
 * @returns {Promise<Object>} Sending result.
 */
async function sendDonationEmailReceipt(donation, pdfPath) {
  const transporter = getTransporter();

  const recipient = donation.email;
  const donorName = donation.donorName;
  const amount = donation.amount;
  const seva = donation.sevaCategory;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7fafc; color: #2d3748; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e2e8f0; }
        .header { background-color: #e65100; padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; }
        .content { padding: 30px; line-height: 1.6; }
        .cta-box { background-color: #fffaf0; border: 1px dashed #ff9933; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center; }
        .btn { display: inline-block; background-color: #ff9933; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px; }
        .footer { background-color: #edf2f7; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>HARE KRISHNA DHARMA TRUST</h1>
        </div>
        <div class="content">
          <p>Hare Krishna, Dear <strong>${donorName}</strong>,</p>
          <p>We humbily acknowledge and thank you for your generous seva donation towards our spiritual and social welfare programs.</p>
          
          <div class="cta-box">
            <h3 style="margin: 0; color: #e65100;">Seva details:</h3>
            <p style="margin: 8px 0; font-size: 18px;"><strong>${seva}</strong></p>
            <div style="text-align: left; margin: 15px auto; max-width: 300px; font-size: 14px; background: #fff; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${donation.id}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: green; font-weight: bold;">Verified (Paid)</span></p>
            </div>
            <p style="margin: 0; font-size: 20px; color: #2d3748;"><strong>₹${amount.toLocaleString('en-IN')}.00 Paid Successfully</strong></p>
          </div>

          <p>Your contribution helps feed holy cows, prepare nutritious prasadam meals, and extend education to children in need. An official PDF donation certificate has been generated and is attached directly to this email for your records.</p>
          
          <p>May Lord Sri Krishna bless you with abundance, good health, and deep devotion.</p>
        </div>
        <div class="footer">
          <p>This is an automated receipt confirmation from Hare Krishna Dharma Trust.</p>
          <p>Sri Radha Krishna Dham, Mathura, UP, India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(`\n--- [SMTP Email Dev Simulation] ---`);
    console.log(`To: ${recipient}`);
    console.log(`Subject: Official Seva Donation Receipt - ${donation.id}`);
    console.log(`Attachment: ${pdfPath}`);
    console.log(`-------------------------------------\n`);
    return { mockSuccess: true, message: 'Simulated email dispatch successful' };
  }

  const mailOptions = {
    from: `"Hare Krishna Dharma Trust" <${process.env.SMTP_SENDER || process.env.SMTP_USER}>`,
    to: recipient,
    subject: `🙏 Official Seva Donation Receipt - ${donation.id.substring(0, 8).toUpperCase()}`,
    html: htmlBody,
    attachments: [
      {
        filename: `Seva_Receipt_${donation.id.substring(0, 8).toUpperCase()}.pdf`,
        path: pdfPath
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Receipt sent to ${recipient}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]: SMTP sending failed.', error.message);
    if (error.code === 'EAUTH' || error.responseCode === 535) {
        console.error('>> HINT: Authentication failed. Please verify your SMTP_USER and SMTP_PASS/SMTP_APP_PASSWORD in the backend .env file are correct and valid.');
    }
    throw new Error('Failed to dispatch receipt email');
  }
}

/**
 * Sends a general program inquiry confirmation email to a lead
 */
async function sendInquiryConfirmation(lead, programTitle) {
  const transporter = getTransporter();

  const recipient = lead.email;
  const leadName = lead.name;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7fafc; color: #2d3748; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e2e8f0; }
        .header { background-color: #e65100; padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; }
        .content { padding: 30px; line-height: 1.6; }
        .footer { background-color: #edf2f7; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>HARE KRISHNA DHARMA TRUST</h1>
        </div>
        <div class="content">
          <p>Hare Krishna, <strong>${leadName}</strong>,</p>
          <p>We have successfully received your registration inquiry regarding our upcoming program: <strong>${programTitle}</strong>.</p>
          
          <p>One of our ashram staff members will reach out to you within 24 hours via phone or email to share the itinerary, guidelines, and answer any questions you might have.</p>
          
          <p>Thank you for expressing interest in our spiritual activities.</p>
        </div>
        <div class="footer">
          <p>Hare Krishna Dharma Trust - Sri Radha Krishna Dham, Mathura, India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(`\n--- [SMTP Email Dev Simulation] ---`);
    console.log(`To: ${recipient}`);
    console.log(`Subject: Registration Received - ${programTitle}`);
    console.log(`-------------------------------------\n`);
    return { mockSuccess: true };
  }

  const mailOptions = {
    from: `"Hare Krishna Dharma Trust" <${process.env.SMTP_SENDER || process.env.SMTP_USER}>`,
    to: recipient,
    subject: `🙏 Program Inquiry Registered - ${programTitle}`,
    html: htmlBody
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Lead confirmation sent to ${recipient}`);
  } catch (error) {
    console.error('[Email Service Inquiry Error]:', error);
  }
}

module.exports = {
  sendDonationEmailReceipt,
  sendInquiryConfirmation
};
