const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { hashPassword, authenticateCms } = require('../middleware/cmsAuth');
const crypto = require('crypto');

// Middleware to ensure only superadmin can manage users
const requireSuperAdmin = authenticateCms(['superadmin']);

/**
 * GET /api/cms/users
 * List all staff admins
 */
router.get('/', requireSuperAdmin, async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    if (usersSnapshot.empty) {
      return res.json([]);
    }
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      // Never return the hashed password
      delete data.password;
      return { id: doc.id, ...data };
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

/**
 * POST /api/cms/users
 * Create a new staff admin
 */
router.post('/', requireSuperAdmin, async (req, res) => {
  const { name, email, password, role, permissions, phone } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }

  try {
    // Check if user already exists
    const existing = await db.collection('users').where('email', '==', email).get();
    if (!existing.empty) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const userData = {
      name,
      email,
      phone: phone || '',
      password: hashPassword(password),
      role, // 'staff' or 'superadmin'
      permissions: permissions || [],
      isActive: true,
      createdAt: new Date(),
    };

    const result = await db.collection('users').add(userData);

    // Log the action
    await db.collection('logs').add({
      userName: req.user.name,
      userRole: req.user.effectiveRole,
      action: `Created user ${email}`,
      module: 'User Management',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({ success: true, userId: result.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

/**
 * PUT /api/cms/users/:id
 * Update staff admin (permissions, status, password)
 */
router.put('/:id', requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, role, permissions, isActive, password, phone } = req.body;

  try {
    const docRef = db.collection('users').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (permissions !== undefined) updates.permissions = permissions;
    if (isActive !== undefined) updates.isActive = isActive;
    if (phone !== undefined) updates.phone = phone;
    if (password) updates.password = hashPassword(password);
    
    updates.updatedAt = new Date();

    await docRef.set(updates, { merge: true });

    // Log the action
    await db.collection('logs').add({
      userName: req.user.name,
      userRole: req.user.effectiveRole,
      action: `Updated user ${doc.data().email}`,
      module: 'User Management',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

/**
 * DELETE /api/cms/users/:id
 * Delete a staff admin
 */
router.delete('/:id', requireSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('users').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    const email = doc.data().email;

    await docRef.delete();

    // Log the action
    await db.collection('logs').add({
      userName: req.user.name,
      userRole: req.user.effectiveRole,
      action: `Deleted user ${email}`,
      module: 'User Management',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

/**
 * POST /api/cms/users/change-password
 * Change password for the currently logged in user
 */
router.post('/change-password', authenticateCms(['superadmin', 'staff']), async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const uid = req.user.uid;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Old password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  try {
    // If it's the initial default admin without a DB entry, we should block or handle gracefully
    if (uid === 'admin_initial') {
      return res.status(400).json({ error: 'Cannot change password of the default fallback admin.' });
    }

    const docRef = db.collection('users').doc(uid);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found in database.' });
    }

    const userData = doc.data();

    if (userData.password !== hashPassword(oldPassword)) {
      return res.status(401).json({ error: 'Incorrect old password.' });
    }

    await docRef.set({
      password: hashPassword(newPassword),
      updatedAt: new Date()
    }, { merge: true });

    // Log the action
    await db.collection('logs').add({
      userName: req.user.name,
      userRole: req.user.effectiveRole,
      action: `Changed their own password`,
      module: 'Auth',
      createdAt: new Date(),
      ip: req.ip
    });

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password.' });
  }
});

module.exports = router;
