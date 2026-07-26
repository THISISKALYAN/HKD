const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { authenticateCms } = require('../middleware/cmsAuth');

// Accessible to both superadmin and staff (staff might only see their own logs later if needed, but for now superadmin only is safer, or both can view)
const requireCmsAuth = authenticateCms(['superadmin', 'staff']);

/**
 * GET /api/cms/logs
 * Retrieve activity logs
 */
router.get('/', requireCmsAuth, async (req, res) => {
  try {
    // Basic pagination could be added here using req.query
    const logsSnapshot = await db.collection('logs').orderBy('createdAt', 'desc').limit(100).get();
    
    if (logsSnapshot.empty) {
      return res.json([]);
    }
    
    const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to retrieve activity logs.' });
  }
});

/**
 * POST /api/cms/logs
 * Create an activity log (mainly for frontend actions like page edits)
 */
router.post('/', requireCmsAuth, async (req, res) => {
  const { action, module } = req.body;

  if (!action || !module) {
    return res.status(400).json({ error: 'Action and module are required.' });
  }

  try {
    const logData = {
      userName: req.user.name,
      userRole: req.user.effectiveRole,
      action: action.substring(0, 200),
      module: module.substring(0, 100),
      createdAt: new Date(),
      ip: req.ip
    };

    const result = await db.collection('logs').add(logData);
    res.json({ success: true, logId: result.id });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ error: 'Failed to create activity log.' });
  }
});

module.exports = router;
