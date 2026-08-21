const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const { db } = require('../services/firebase');
const { sendInquiryConfirmation } = require('../services/email');
const cache = require('../services/cache');
const { authLimiter } = require('../middleware/security');
const { JWT_SECRET, hashPassword, authenticateCms } = require('../middleware/cmsAuth');
const { generateSecret, generateURI, verifySync } = require('otplib');
const QRCode = require('qrcode');

/**
 * POST /api/cms/auth/login
 */
router.post('/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Basic rate limit check done by authLimiter
    
    // Check if the user exists
    const usersSnapshot = await db.collection('users').where('email', '==', email).get();
    
    // If user doesn't exist in Firestore, check if they are the default admin
    if (usersSnapshot.empty) {
      const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@hkd.org';
      const defaultAdminPass = process.env.ADMIN_PASSWORD || 'harekrishna@001';
      
      if (email === defaultAdminEmail && password === defaultAdminPass) {
        // Bootstrap: Create the default admin in Firestore permanently
        const newUid = 'admin_' + Date.now();
        await db.collection('users').doc(newUid).set({
          email: defaultAdminEmail,
          password: hashPassword(defaultAdminPass),
          role: 'superadmin',
          name: 'Admin',
          isActive: true,
          permissions: [],
          createdAt: new Date()
        });

        const token = jwt.sign(
          { email, role: 'superadmin', name: 'Admin', uid: newUid, permissions: [] },
          JWT_SECRET,
          { expiresIn: '8h' }
        );
        
        // Log the successful fallback login
        await db.collection('logs').add({
          userName: 'Admin',
          userRole: 'superadmin',
          action: 'Login (Initial Bootstrap)',
          module: 'Auth',
          createdAt: new Date(),
          ip: req.ip
        });

        if (defaultAdminEmail === 'admin@hkd.org') {
          // If you want to force MFA on default admin, you can set it here later
        }

        return res.json({ token, user: { email, role: 'superadmin', name: 'Admin', permissions: [], mfaEnabled: false } });
      }
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    const userData = usersSnapshot.docs[0].data();
    const uid = usersSnapshot.docs[0].id;

    if (userData.isActive === false) {
      return res.status(401).json({ error: 'Account is deactivated. Please contact administrator.' });
    }

    if (userData.password !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    if (userData.mfaEnabled) {
      const tempToken = jwt.sign(
        { uid, isMfaTemp: true },
        JWT_SECRET,
        { expiresIn: '5m' }
      );
      return res.json({ mfaRequired: true, tempToken });
    }

    const token = jwt.sign(
      { email: userData.email, role: userData.role, name: userData.name, uid, permissions: userData.permissions || [] },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Activity Log
    await db.collection('logs').add({
      userName: userData.name,
      userRole: userData.role,
      action: 'Login',
      module: 'Auth',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({
      token,
      user: { email: userData.email, role: userData.role, name: userData.name, permissions: userData.permissions || [], mfaEnabled: userData.mfaEnabled || false },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

/**
 * POST /api/cms/auth/mfa/verify
 */
router.post('/auth/mfa/verify', authLimiter, async (req, res) => {
  const { tempToken, code } = req.body;
  if (!tempToken || !code) return res.status(400).json({ error: 'Token and code required.' });

  try {
    const decoded = jwt.verify(tempToken, JWT_SECRET);
    if (!decoded.isMfaTemp || !decoded.uid) {
      return res.status(401).json({ error: 'Invalid token type.' });
    }

    const userDoc = await db.collection('users').doc(decoded.uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: 'User not found.' });

    const userData = userDoc.data();
    if (!userData.mfaEnabled || !userData.mfaSecret) {
      return res.status(400).json({ error: 'MFA is not enabled for this user.' });
    }

    const verifyResult = verifySync({ token: code, secret: userData.mfaSecret });
    const isValid = verifyResult && verifyResult.valid;
    if (!isValid) return res.status(401).json({ error: 'Invalid MFA code.' });

    const token = jwt.sign(
      { email: userData.email, role: userData.role, name: userData.name, uid: decoded.uid, permissions: userData.permissions || [] },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    await db.collection('logs').add({
      userName: userData.name,
      userRole: userData.role,
      action: 'Login (MFA)',
      module: 'Auth',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({
      token,
      user: { email: userData.email, role: userData.role, name: userData.name, permissions: userData.permissions || [], mfaEnabled: userData.mfaEnabled || false },
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired temporary token.' });
  }
});

/**
 * POST /api/cms/auth/mfa/setup
 */
router.post('/auth/mfa/setup', authenticateCms(), async (req, res) => {
  try {
    const secret = generateSecret();
    const otpauth = generateURI({ accountName: req.user.email, issuer: 'HKD CMS', secret });
    const qrCodeUrl = await QRCode.toDataURL(otpauth);
    
    await db.collection('users').doc(req.user.uid).update({
      tempMfaSecret: secret
    });

    res.json({ qrCodeUrl, secret });
  } catch (error) {
    console.error('MFA setup error:', error);
    res.status(500).json({ error: 'Failed to setup MFA.' });
  }
});

/**
 * POST /api/cms/auth/mfa/enable
 */
router.post('/auth/mfa/enable', authenticateCms(), async (req, res) => {
  const { code } = req.body;
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();
    
    if (!userData.tempMfaSecret) {
      return res.status(400).json({ error: 'MFA setup not initiated.' });
    }

    const verifyResult = verifySync({ token: code, secret: userData.tempMfaSecret });
    const isValid = verifyResult && verifyResult.valid;
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid MFA code.' });
    }

    await db.collection('users').doc(req.user.uid).update({
      mfaSecret: userData.tempMfaSecret,
      mfaEnabled: true,
      tempMfaSecret: null
    });

    res.json({ success: true, message: 'MFA enabled successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable MFA.' });
  }
});

/**
 * GET /api/cms/pages/:pageId
 */
router.get('/pages/:pageId', async (req, res) => {
  const targetId = req.params.pageId;

  if (!/^[a-zA-Z0-9_-]+$/.test(targetId)) {
    return res.status(400).json({ error: 'Invalid page identifier.' });
  }

  try {
    const cacheKey = `page:${targetId}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const docRef = db.collection('pages_content').doc(targetId);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      await cache.set(cacheKey, data, 300);
      res.setHeader('X-Cache', 'MISS');
      return res.json(data);
    }

    let defaultContent = {};

    if (targetId === 'home') {
      defaultContent = {
        hero: {
          title: 'Preserve Vedic Culture, Protect Holy Cows',
          subtitle: 'Join us in offering Gau Seva and Annadana Prasadam in the sacred land of Sri Radha Krishna Dham.',
          bannerUrl: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=1600',
          ctaText: 'Offer Seva Now',
        },
        about: {
          title: 'Our Mission of Compassion',
          content: 'We are dedicated to establishing high standards of cow care (Gau Seva), organizing daily food distribution (Annadana Seva), and promoting classical spiritual education across the region.',
        },
        bannerText: 'Upcoming Auspicious Ekadashi and Child Annadana Seva Festivals. Participate Online!',
        heroSlides: ['/h1.webp', '/h2.webp', '/h3.webp'],
        dailyDarshan: { imageUrl: '/h2.webp', date: new Date().toISOString() },
        templeGallery: []
      };
    } else if (targetId === 'prasadam') {
      defaultContent = {
        deliveryAddress: 'Sri Radha Krishna Dham, Dehradun',
        phoneNumber: '+91-9876543210'
      };
    } else {
      defaultContent = {
        title: `Visual Content Section for ${targetId}`,
        subtitle: 'Edit this page content in-browser using our built-in CMS.',
        updatedAt: new Date(),
      };
    }

    await docRef.set(defaultContent);
    await cache.set(cacheKey, defaultContent, 300);
    res.json(defaultContent);
  } catch (error) {
    console.error('Error fetching CMS page content:', error);
    res.status(500).json({ error: 'Failed to retrieve page sections.' });
  }
});

/**
 * PUT /api/cms/pages/:pageId
 */
router.put('/pages/:pageId', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { pageId } = req.params;

  if (!/^[a-zA-Z0-9_-]+$/.test(pageId)) {
    return res.status(400).json({ error: 'Invalid page identifier.' });
  }

  const newContent = req.body;

  try {
    const docRef = db.collection('pages_content').doc(pageId);
    await docRef.set({
      ...newContent,
      updatedAt: new Date(),
      updatedBy: req.user.email,
    });

    await cache.del(`page:${pageId}`);

    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('CMS update error:', error);
    res.status(500).json({ error: 'Failed to save layout changes.' });
  }
});

/**
 * POST /api/cms/leads
 */
router.post('/leads', async (req, res) => {
  const { name, email, phone, interestType, targetId, message, selectedPackage } = req.body;

  if (!name || !email || !phone || !interestType) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and lead type.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }

  const phoneClean = phone.replace(/[^\d+]/g, '');
  if (phoneClean.length < 10 || phoneClean.length > 15) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  try {
    const leadData = {
      name: name.substring(0, 100),
      email: email.substring(0, 100),
      phone: phoneClean,
      interestType: interestType.substring(0, 50),
      targetId: (targetId || 'general').substring(0, 50),
      message: (message || '').substring(0, 1000),
      selectedPackage: (selectedPackage || '').substring(0, 100),
      status: 'new',
      createdAt: new Date(),
    };

    const result = await db.collection('leads').add(leadData);

    const programName = targetId === 'general' ? 'General Inquiry' : targetId;
    sendInquiryConfirmation(leadData, programName).catch(err =>
      console.error('[SMTP Lead Email Error]:', err.message)
    );

    // Create real-time notification
    try {
      await db.collection('cms_notifications').add({
        title: 'New Lead Received',
        message: `${name} (${interestType}) just submitted an inquiry.`,
        type: 'lead',
        read: false,
        createdAt: new Date(),
        link: '/admin/leads'
      });
    } catch (notifErr) {
      console.error('[Notification Error]:', notifErr.message);
    }

    res.json({ success: true, leadId: result.id });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to process inquiry request.' });
  }
});

/**
 * POST /api/cms/blogs
 */
router.post('/blogs', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { title, excerpt, content, coverImage, authorName, seoTitle, seoDescription } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Blog title and article content are required.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 200);

  try {
    const blogData = {
      title: title.substring(0, 300),
      slug,
      excerpt: (excerpt || '').substring(0, 500),
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
      authorName: (authorName || 'Ashram Editor').substring(0, 100),
      seoTitle: (seoTitle || title).substring(0, 200),
      seoDescription: (seoDescription || excerpt || '').substring(0, 300),
      createdAt: new Date(),
      published: true,
    };

    await db.collection('blogs').doc(slug).set(blogData);
    await cache.del('blogs:list');

    res.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating blog article:', error);
    res.status(500).json({ error: 'Failed to write blog post.' });
  }
});

/**
 * DELETE /api/cms/blogs/:slug
 */
router.delete('/blogs/:slug', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { slug } = req.params;

  try {
    const blogRef = db.collection('blogs').doc(slug);
    const doc = await blogRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    await blogRef.delete();
    await cache.del('blogs:list');

    res.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
});

/**
 * GET /api/cms/blogs
 */
router.get('/blogs', async (req, res) => {
  try {
    const cached = await cache.get('blogs:list');
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const snapshot = await db.collection('blogs').get();

      if (snapshot.empty) {
        const mockBlogs = [
          {
            slug: "kartik-deepotsav",
            title: "Kartik Deepotsav in Braj – The Divine Festival of Lights",
            category: "Festivals",
            readTime: "5 min read",
            authorName: "HKM Admin",
            createdAt: new Date("October 15, 2026"),
            excerpt: "Discover the deep significance of offering ghee lamps in Kartik month and how it awakens divine devotion in our hearts.",
            coverImage: "/deepostav.webp",
            published: true,
            content: `KARTIK DEEPOTSAV IN BRAJ: THE DIVINE FESTIVAL OF LIGHTS\n\nIntroduction\nDeepotsav, the festival of light, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples and holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.\n\nWhy Kartik Is Special\nKartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.\n\nThe Story of Lord Damodara\nThe festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.\n\nNalakuvara and Manigriva\nDuring this pastime, Krishna delivered Nalakuvara and Manigriva, the sons of Kuvera, who had been cursed to become twin trees. By Krishna’s touch, they were freed from the curse and attained spiritual liberation.\n\nDeepdaan During Kartik\nOffering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His blessings.\n\nCelebrations in Braj\nTemples throughout Braj shine with thousands of lamps, devotional songs, kirtans, and special worship ceremonies. The entire atmosphere becomes vibrant with spiritual joy and devotion.\n\nKartik Deepotsav at HKM Dehradun\nHKM Dehradun celebrates the entire month with:\n* Daily Deepdaan Seva at 8:00 PM\n* Damodarashtakam Kirtan\n* Nauka Vihar Festival\n* Yamuna Boat Ride Pastimes\n* Shobha Yatra\n* Special Spiritual Programs\n\nJoin us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`
          },
          {
            slug: "sri-gaura-purnima",
            title: "Sri Gaura Purnima – The Appearance of Sri Chaitanya Mahaprabhu",
            category: "Festivals",
            readTime: "6 min read",
            authorName: "HKM Admin",
            createdAt: new Date("March 14, 2026"),
            excerpt: "Explore the divine descent of the golden avatar, Sri Chaitanya Mahaprabhu, and His revolutionary sankirtan movement.",
            coverImage: "https://hkmguwahati.org/wp-content/uploads/2026/02/720x480_GP.png",
            published: true,
            content: `SRI GAURA PURNIMA: THE APPEARANCE OF SRI CHAITANYA MAHAPRABHU\n\nThe Golden Avatar\nSri Gaura Purnima celebrates the divine appearance of Sri Chaitanya Mahaprabhu, the Supreme Lord who appeared in Navadvipa, West Bengal, over 500 years ago. Known as the Golden Avatar because of His beautiful golden complexion, He descended not with weapons, but with the boundless mercy of Harinama Sankirtan (the congregational chanting of the Holy Names).\n\nThe Yuga Dharma\nVedic scriptures, including the Srimad Bhagavatam, predict His appearance to establish the Yuga Dharma for this age of Kali. Lord Chaitanya freely distributed the most sublime gift—love of God (Krishna Prema)—to everyone, regardless of caste, creed, or background.\n\nThe Sankirtan Movement\nHe inaugurated the Harinama Sankirtan movement, wandering through towns and villages chanting the Hare Krishna Mahamantra:\nHare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare\n\nThis simple yet profound process of chanting is prescribed as the most effective means of self-realization in the current age.\n\nTeachings of Lord Chaitanya\nLord Chaitanya taught that we are eternal spiritual beings, originally servants of Krishna. By chanting the Holy Names without offenses, the mirror of our heart is cleansed, allowing us to taste the nectar of divine love for which we are always anxious.\n\nGaura Purnima Festivities at HKM Dehradun\nAt Hare Krishna Mandir Dehradun, Gaura Purnima is celebrated with immense joy and spiritual fervor:\n* Grand Maha-Abhishekam of Sri Sri Gaura Nitai\n* Ecstatic Kirtans and Bhajans\n* Enlightening discourses on Lord Chaitanya's pastimes\n* Splendid pushpalankara (flower decorations)\n* Distribution of grand feast prasadam\n\nJoin us on this highly auspicious day to receive the limitless blessings of Sri Chaitanya Mahaprabhu and experience true spiritual bliss.`
          },
          {
            slug: "daily-annadana-seva",
            title: "Daily Annadana Seva: Nourishing the Pilgrims in Hare Krishna Movement Dehradun",
            category: "Devotion",
            readTime: "4 min read",
            authorName: "HKM Admin",
            createdAt: new Date("June 10, 2026"),
            excerpt: "Learn about the spiritual significance of Anna Daan and our daily initiative to feed hot, nutritious prasadam to sadhus and visitors.",
            coverImage: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png",
            published: true,
            content: `DAILY ANNADANA SEVA: NOURISHING PILGRIMS IN HARE KRISHNA MOVEMENT DEHRADUN\n\nThe Supreme Charity\nIn Vedic tradition, 'Anna Daan' (the donation of food) is glorified as the highest form of charity (Maha Daan). When food is first offered to the Supreme Lord, it becomes 'Prasadam'—sanctified food that nourishes not only the physical body but also purifies the soul.\n\nOur Daily Commitment\nAt Hare Krishna Movement Dehradun, we are committed to ensuring that no one goes hungry. Every single day, thousands of plates of hot, nutritious, and delicious Khichdi prasadam are distributed free of cost to sadhus (monks), pilgrims, visitors, and locals.\n\nThe Spiritual Benefits of Distributing Prasadam\nThe act of distributing and honoring prasadam is a deeply spiritual exchange. It breaks down barriers, cultivates compassion, and invokes the boundless blessings of the Lord. As described in the Bhagavad-gita, food offered in sacrifice (yajna) frees one from all karmic reactions.\n\nHow You Can Participate\nThis massive daily endeavor is sustained by the generous contributions of kind-hearted donors. By sponsoring Annadana on your birthdays, anniversaries, or in memory of loved ones, you partake in this immense spiritual merit. \n\nJoin us in this noble cause. Your contribution, no matter how small, ensures that the sacred tradition of Annadana continues uninterrupted, spreading joy, health, and spiritual blessings to thousands daily.`
          },
          {
            slug: "gau-seva",
            title: "Gau Seva: The Spiritual Significance of Serving Mother Cow",
            category: "Service",
            readTime: "5 min read",
            authorName: "HKM Admin",
            createdAt: new Date("May 05, 2026"),
            excerpt: "Discover why cow protection is central to Vedic culture and how serving cows invites prosperity, peace, and divine blessings.",
            coverImage: "https://iskconmumbaipull-21250.kxcdn.com/web/image/2314-6e6f1f25/gau3.webp",
            published: true,
            content: `GAU SEVA: THE SPIRITUAL SIGNIFICANCE OF SERVING MOTHER COW\n\nThe Glories of Mother Cow\nIn the Vedic scriptures, the cow is revered as a sacred mother (Gomata) who sustains human life with her pure milk. Lord Krishna, the Supreme Personality of Godhead, is deeply fond of cows and is lovingly addressed as Govinda and Gopala—the protector of the cows.\n\nGau Seva in Vedic Culture\nServing cows (Gau Seva) is not merely an act of animal welfare; it is a profound spiritual practice. The scriptures state that 33 crore demigods reside in the body of a cow. Therefore, by serving a cow, one simultaneously pleases all the universal controllers.\n\nBenefits of Gau Seva\n* Spiritual Purification: Tending to cows cleanses the heart of material contamination.\n* Prosperity and Peace: Homes and communities that protect and serve cows are blessed with abundance, peace, and harmony.\n* Medicinal Value: Cow products (Panchagavya) are highly prized in Ayurveda for their immense medicinal and purifying properties.\n\nOur Surabhi Goshala\nHare Krishna Mandir Dehradun operates the Surabhi Goshala, a sanctuary where cows and calves are cared for with deep love and devotion. They are provided with nutritious fodder, clean water, regular medical checkups, and a spacious, joyful environment.\n\nBecome a Gau Sevak\nWe invite you to visit our Goshala and experience the serene joy of Gau Seva. You can offer green grass, jaggery, and your personal time to serve these gentle beings. By supporting the Goshala through donations, you directly participate in cow protection, attracting the eternal blessings of Lord Sri Krishna.`
          },
          {
            slug: "overcoming-anxiety",
            title: "Overcoming Anxiety: Timeless Wisdom from the Bhagavad-Gita",
            category: "Wisdom",
            readTime: "7 min read",
            authorName: "HKM Admin",
            createdAt: new Date("July 22, 2026"),
            excerpt: "Modern life is full of stress, but the 5000-year-old teachings of the Bhagavad-gita offer practical, deeply spiritual solutions for finding lasting peace.",
            coverImage: "https://bestmindbh.com/wp-content/uploads/tms-for-anxiety.webp",
            published: true,
            content: `OVERCOMING ANXIETY: TIMELESS WISDOM FROM THE BHAGAVAD-GITA\n\nThe Modern Epidemic\nIn today's fast-paced, hyper-connected world, anxiety, stress, and depression have become a global epidemic. Despite unprecedented technological advancements, true inner peace remains elusive for many. \n\nArjuna's Dilemma\nOver 5,000 years ago on the battlefield of Kurukshetra, the great warrior Arjuna faced a profound crisis. Overwhelmed by anxiety, confusion, and grief, he dropped his weapons and turned to Lord Krishna for guidance. This conversation forms the essence of the Bhagavad-gita.\n\nThe Root Cause of Anxiety\nLord Krishna explains that the root cause of our anxiety is our false identification with the temporary material body and our attachment to the unpredictable results of our actions. We constantly worry about protecting what we have and acquiring what we don't.\n\nPractical Solutions from the Gita\n1. Know Thy Self: The Gita's primary teaching is that we are not the perishable body, but eternal spiritual souls (Atman). Understanding our eternal nature instantly diminishes the fear of loss and death.\n2. Detached Action (Karma Yoga): Krishna advises us to perform our duties diligently but to detach ourselves from the results. "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action." (BG 2.47). By offering the results to the Supreme, we work without the heavy burden of anxiety.\n3. The Power of Meditation and Mantra: The mind is famously described as restless and turbulent like the wind. The Gita recommends controlling the mind through constant practice and detachment. In the current age, the most effective meditation is chanting the Holy Names—the Hare Krishna Mahamantra—which calms the mind and cleanses the heart.\n\nFinding True Peace\nTrue peace comes from realizing our relationship with the Supreme Lord. Krishna declares, "A person in full consciousness of Me, knowing Me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries." (BG 5.29).\n\nBy applying these timeless principles, we can navigate the challenges of modern life with a calm, focused, and joyful mind.`
          },
          {
            slug: "sri-krishna-janmashtami",
            title: "Sri Krishna Janmashtami – Celebrating the Supreme Appearance",
            category: "Festivals",
            readTime: "8 min read",
            authorName: "HKM Admin",
            createdAt: new Date("August 20, 2026"),
            excerpt: "Immerse in the grandest celebration of the year with midnight Aarti, continuous Kirtans, 108 bhoga offerings, and joyful cultural performances.",
            coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSifUgNN81-ateX-Kjn4ZH2AoRBO53EoKFEiSypT-LTBzbg5fBSe-KFBhk&s=10",
            published: true,
            content: `SRI KRISHNA JANMASTHAMI: CELEBRATING THE SUPREME APPEARANCE\n\nThe Divine Advent of Sri Krishna\nSri Krishna Janmashtami is the most grand, exuberant, and sacred festival celebrated across the globe, commemorating the divine advent of Lord Sri Krishna in Mathura over 5,200 years ago. As declared by Lord Krishna Himself in the Bhagavad-Gita (Chapter 4, Verses 7 and 8):\n\nWhenever and wherever there is a decline in religious practice and a predominant rise of irreligion, at that time I descend Myself. To deliver the pious and to annihilate the miscreants, as well as to re-establish the principles of righteousness, I appear millennium after millennium.\n\nLord Krishna's appearance is not a ordinary material birth conditioned by past karma, but an eternal, transcendental pastime (janma karma ca me divyam) designed to re-awaken divine love and peace in the hearts of all living entities.\n\nThe Night of Divine Deliverance\nLord Krishna appeared at midnight in the prison cell of King Kamsa, where His pure-hearted parents, Vasudeva and Devaki, were held captive. Upon His appearance, the heavy iron chains fell away, the prison doors unlocked automatically, and Vasudeva safely carried baby Krishna across the raging Yamuna River to the peaceful village of Gokula, where He was raised by Nanda Maharaja and Yashoda Maiya.\n\nFestivities at Hare Krishna Movement Dehradun\nJanmashtami at Hare Krishna Mandir Dehradun is an unforgettable celebration of devotion, light, and spiritual ecstasy:\n- Continuous Harinama Kirtan: Non-stop chanting of holy mantras echoing from dawn until midnight.\n- Midnight Maha Abhishekam: The ceremonial bathing of baby Krishna (Laddoo Gopal) with milk, curd, honey, ghee, fruit juices, and sanctified water amidst blowing of conch shells.\n- 108 Chappan Bhoga Offering: Offering 108 distinct varieties of vegetarian delicacies prepared with love by temple chefs.\n- Cultural Performances & Jhulan Seva: Devotional plays, classical dance routines, and flower swing offerings.\n- Grand Prasadam Feast: Serving thousands of visiting families with sanctified birthday feast offerings.\n\nWe cordially invite you and your family to join us on Sri Krishna Janmashtami, fast until midnight, immerse in the ecstatic kirtan, and receive the boundless blessings of Lord Sri Krishna.`
          }
        ];
        return res.json(mockBlogs);
      }

    const blogs = snapshot.docs.map(doc => doc.data());
    await cache.set('blogs:list', blogs, 600);
    res.setHeader('X-Cache', 'MISS');
    res.json(blogs);
  } catch (error) {
    console.error('Error listing blog posts:', error);
    res.status(500).json({ error: 'Failed to retrieve blog listings.' });
  }
});

/**
 * GET /api/cms/leads
 */
router.get('/leads', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  try {
    const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').limit(100).get();
    if (snapshot.empty) {
      return res.json([]);
    }
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to retrieve leads.' });
  }
});

/**
 * DELETE /api/cms/leads/:id
 */
router.delete('/leads/:id', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required to delete an inquiry.' });
  }

  try {
    // Verify password for the currently logged in user
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const userData = userDoc.data();
    if (userData.password !== hashPassword(password)) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Password verified, delete the lead
    const leadRef = db.collection('leads').doc(id);
    const leadDoc = await leadRef.get();
    if (!leadDoc.exists) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    await leadRef.delete();

    // Log the action
    await db.collection('logs').add({
      userName: req.user.name,
      userRole: req.user.role,
      action: `Deleted inquiry: ${leadDoc.data().email || id}`,
      module: 'Leads',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

/**
 * GET /api/cms/dashboard-stats
 */
router.get('/dashboard-stats', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const applyDateFilter = (docs) => {
      if (!startDate && !endDate) return docs;
      const start = startDate ? new Date(startDate).getTime() : 0;
      const end = endDate ? new Date(endDate).getTime() : Infinity;

      return docs.filter(doc => {
        const data = doc.data();
        if (!data.createdAt) return false; // Or true if we want to include items with no date? Let's say false.
        const createdAtTime = data.createdAt.toDate ? data.createdAt.toDate().getTime() : 
                              (data.createdAt._seconds ? data.createdAt._seconds * 1000 : new Date(data.createdAt).getTime());
        return createdAtTime >= start && createdAtTime <= end;
      });
    };

    const [leadsSnapshot, blogsSnapshot, usersSnapshot, prasadamSnapshot] = await Promise.allSettled([
      db.collection('leads').get(),
      db.collection('blogs').get(),
      db.collection('users').where('role', 'in', ['staff', 'superadmin']).get(),
      db.collection('donations').where('receivePrasadam', '==', true).get()
    ]);
    
    const leadsDocs = leadsSnapshot.status === 'fulfilled' ? leadsSnapshot.value.docs : [];
    const blogsDocs = blogsSnapshot.status === 'fulfilled' ? blogsSnapshot.value.docs : [];
    const usersSize = usersSnapshot.status === 'fulfilled' ? (usersSnapshot.value.size || usersSnapshot.value.docs?.length || 0) : 0;
    
    const filteredLeads = applyDateFilter(leadsDocs);
    const filteredBlogs = applyDateFilter(blogsDocs);
    
    // Filter prasadam metrics in-memory to avoid needing a composite index
    const prasadamDocs = prasadamSnapshot.status === 'fulfilled' ? prasadamSnapshot.value.docs.filter(doc => ['successful', 'paid'].includes(doc.data().status)) : [];
    const filteredPrasadam = applyDateFilter(prasadamDocs);
      
    let totalPrasadamRequests = 0;
    let pendingDeliveries = 0;
    let outForDelivery = 0;
    let delivered = 0;
    
    filteredPrasadam.forEach(doc => {
      totalPrasadamRequests++;
      const data = doc.data();
      if (data.deliveryStatus === 'Out for Delivery') outForDelivery++;
      else if (data.deliveryStatus === 'Delivered') delivered++;
      else pendingDeliveries++;
    });
    
    // Get CMS pages
    const [homeDoc, dailyDarshanDoc, folkGalleryDoc] = await Promise.allSettled([
      db.collection('cms_pages').doc('home').get(),
      db.collection('cms_pages').doc('daily-darshan').get(),
      db.collection('cms_pages').doc('folk-gallery').get()
    ]);
    
    const homeData = homeDoc.status === 'fulfilled' && homeDoc.value.exists ? homeDoc.value.data() : {};
    const dailyDarshanData = dailyDarshanDoc.status === 'fulfilled' && dailyDarshanDoc.value.exists ? dailyDarshanDoc.value.data() : {};
    const folkGalleryData = folkGalleryDoc.status === 'fulfilled' && folkGalleryDoc.value.exists ? folkGalleryDoc.value.data() : {};

    const totalHeroImages = homeData.heroImages?.length || 3;
    const totalTempleGallery = homeData.templeGallery?.length || 29;
    const totalDailyDarshan = dailyDarshanData.gallery?.length || 10;
    const totalFolkGallery = folkGalleryData.gallery?.length || 0;

    let storageUsed = 0;
    let totalImagesUploaded = 0;
    
    try {
      const fs = require('fs');
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir);
        totalImagesUploaded = files.length;
        files.forEach(file => {
          const stat = fs.statSync(path.join(uploadsDir, file));
          storageUsed += stat.size;
        });
      }
    } catch (err) {
      console.error('Error calculating storage stats:', err);
    }
    
    res.json({
      totalLeads: filteredLeads.length,
      totalInquiries: filteredLeads.length, 
      totalBlogs: filteredBlogs.length,
      totalStaff: usersSize,
      totalHeroImages,
      totalTempleGallery,
      totalDailyDarshan,
      totalFolkGallery,
      totalImagesUploaded,
      storageUsed,
      totalPrasadamRequests,
      pendingDeliveries,
      outForDelivery,
      delivered,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
});

/**
 * GET /api/cms/logs
 */
router.get('/logs', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  try {
    const snapshot = await db.collection('logs').orderBy('createdAt', 'desc').limit(50).get();
    if (snapshot.empty) {
      return res.json([]);
    }
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to retrieve logs.' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVercel = process.env.VERCEL === '1';
    const uploadsDir = isVercel ? path.join('/tmp', 'uploads') : path.join(__dirname, '..', 'uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/**
 * POST /api/cms/upload
 * Handle image and video uploads
 */
router.post('/upload', authenticateCms(['superadmin', 'staff']), upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // The file is served via the static uploads folder
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});



/**
 * GET /api/cms/prasadam-requests
 * Retrieve all customer prasadam delivery requests
 */
router.get('/prasadam-requests', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  try {
    const snapshot = await db.collection('donations')
      .where('receivePrasadam', '==', true)
      .where('status', 'in', ['successful', 'paid'])
      .get();
      
    if (snapshot.empty) {
      return res.json([]);
    }

    const requests = [];
    snapshot.forEach(doc => {
      requests.push({ id: doc.id, ...doc.data() });
    });

    // Sort descending by createdAt (or equivalent) in memory because of potential missing composite index
    requests.sort((a, b) => {
      const timeA = a.createdAt ? (a.createdAt._seconds ? a.createdAt._seconds : new Date(a.createdAt).getTime()) : 0;
      const timeB = b.createdAt ? (b.createdAt._seconds ? b.createdAt._seconds : new Date(b.createdAt).getTime()) : 0;
      return timeB - timeA;
    });

    res.json(requests);
  } catch (error) {
    console.error('Error fetching prasadam requests:', error);
    res.status(500).json({ error: 'Failed to retrieve prasadam requests.' });
  }
});

/**
 * PUT /api/cms/prasadam-requests/:orderId/status
 * Update the delivery status of a prasadam request
 */
router.put('/prasadam-requests/:orderId/status', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus } = req.body;

  if (!['Pending', 'Out for Delivery', 'Delivered'].includes(deliveryStatus)) {
    return res.status(400).json({ error: 'Invalid delivery status.' });
  }

  try {
    const docRef = db.collection('donations').doc(orderId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Donation record not found.' });
    }

    await docRef.update({
      deliveryStatus,
      updatedAt: new Date()
    });

    res.json({ success: true, deliveryStatus });
  } catch (error) {
    console.error('Error updating prasadam delivery status:', error);
    res.status(500).json({ error: 'Failed to update delivery status.' });
  }
});

module.exports = router;
