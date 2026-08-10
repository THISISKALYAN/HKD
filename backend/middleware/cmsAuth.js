const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'hkd_premium_jwt_secret_108';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + JWT_SECRET).digest('hex');
}

function authenticateCms(roles = ['superadmin', 'admin', 'staff']) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Support legacy 'admin' and new 'superadmin' roles
      const effectiveRole = (decoded.role === 'admin' || !decoded.role) ? 'superadmin' : decoded.role;
      
      const allowedRoles = new Set([...roles, 'admin', 'superadmin']);

      if (!allowedRoles.has(effectiveRole) && !allowedRoles.has(decoded.role)) {
        return res.status(403).json({ error: 'Insufficient permissions for this operation.' });
      }

      req.user = decoded;
      req.user.effectiveRole = effectiveRole;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired administration token.' });
    }
  };
}

module.exports = {
  JWT_SECRET,
  hashPassword,
  authenticateCms
};
