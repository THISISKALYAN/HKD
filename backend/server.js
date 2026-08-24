const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
});


dotenv.config();

const {
  apiLimiter,
  sanitizeInput,
  enforceHttps,
  securityHeaders,
} = require('./middleware/security');

const { initRedis } = require('./services/cache');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploads statically
app.use('/uploads', express.static(uploadsDir));

// HTTPS enforcement in production (behind Cloudflare/nginx)
app.use(enforceHttps);

// Trust first proxy (Cloudflare / nginx / load balancer)
app.set('trust proxy', 1);

// Helmet: comprehensive security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.razorpay.com", "https://lux.razorpay.com", process.env.FRONTEND_URL || "http://localhost:3000"],
      frameSrc: ["'self'", "https://api.razorpay.com"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Additional security headers
app.use(securityHeaders);

// GZIP/Brotli compression for all responses
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));

// HTTP Parameter Pollution protection
app.use(hpp());

// CORS with strict origin control
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://127.0.0.1:3003',
  'https://hkmdehradun.org',
  'https://www.hkmdehradun.org',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    const isDev = process.env.NODE_ENV !== 'production';
    if (!origin || isDev || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400,
}));

// Rate limiting on all API routes
app.use('/api/', apiLimiter);

// Capture raw body for Razorpay webhook validation BEFORE parsing JSON
app.post(
  '/api/payments/verify-webhook',
  express.raw({ type: 'application/json', limit: '1mb' }),
  (req, res, next) => { next(); }
);

// Standard JSON and form parsing with size limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Input sanitization (XSS, NoSQL injection prevention)
app.use(sanitizeInput);

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// API Routes
const paymentRoutes = require('./routes/payments');
const cmsRoutes = require('./routes/cms');
const cmsUsersRoutes = require('./routes/cms-users');
const cmsLogsRoutes = require('./routes/cms-logs');

app.use('/api/payments', paymentRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/cms/users', cmsUsersRoutes);
app.use('/api/cms/logs', cmsLogsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler — never leak stack traces
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
  });
});

const PORT = process.env.PORT || 5000;

// Initialize async services before handling requests
let isInitialized = false;
async function initialize() {
  if (isInitialized) return;
  await initRedis();
  isInitialized = true;
}

// Ensure initialization happens before any request is processed in serverless
app.use(async (req, res, next) => {
  await initialize();
  next();
});

initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`[HKD Backend] Running on port ${PORT} | env: ${process.env.NODE_ENV || 'development'}`);
  });
});

module.exports = app;
