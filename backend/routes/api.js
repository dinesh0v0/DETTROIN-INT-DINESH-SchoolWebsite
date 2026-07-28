/**
 * @file api.js
 * @description Central API router with express-validator rules for all endpoints.
 */

const express = require('express');
const { body, param } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const { submitAdmission } = require('../controllers/admissionController');
const { submitJobApplication, getResume } = require('../controllers/jobController');
const { submitPayment } = require('../controllers/paymentController');
const upload = require('../middleware/upload');

// ─────────────────────────────────────────────
// RATE LIMITING
// ─────────────────────────────────────────────
// Limit form submissions to ~5 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all POST routes in API
router.use((req, res, next) => {
  if (req.method === 'POST') {
    return apiLimiter(req, res, next);
  }
  next();
});

// ─────────────────────────────────────────────
// ADMISSION ROUTES
// ─────────────────────────────────────────────
/**
 * POST /api/admissions
 * Submit a school admission application.
 */
router.post(
  '/admissions',
  [
    body('studentName')
      .trim()
      .notEmpty().withMessage('Student name is required.')
      .isLength({ min: 2, max: 100 }).withMessage('Student name must be 2–100 characters.'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Please provide a valid email address.')
      .normalizeEmail(),
    body('dateOfBirth')
      .notEmpty().withMessage('Date of birth is required.')
      .isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD).')
      .toDate(),
    body('parentGuardianName')
      .trim()
      .notEmpty().withMessage('Parent/Guardian name is required.')
      .isLength({ min: 2, max: 100 }).withMessage('Parent name must be 2–100 characters.'),
    body('gradeApplyingFor')
      .notEmpty().withMessage('Grade applying for is required.')
      .isIn(['pre-primary', 'primary', 'middle', 'senior'])
      .withMessage('Grade must be one of: pre-primary, primary, middle, senior.'),
  ],
  submitAdmission
);

// ─────────────────────────────────────────────
// JOB APPLICATION ROUTES
// ─────────────────────────────────────────────
/**
 * POST /api/jobs
 * Submit a job application with resume (multipart/form-data).
 * upload.single('resume') handles the file and streams it to GridFS.
 */
router.post(
  '/jobs',
  upload.single('resume'),
  [
    body('fullName')
      .trim()
      .notEmpty().withMessage('Full name is required.')
      .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2–100 characters.'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Please provide a valid email address.')
      .normalizeEmail(),
    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required.')
      .matches(/^[+\d][\d\s\-().]{6,19}$/).withMessage('Please provide a valid phone number.'),
    body('positionAppliedFor')
      .notEmpty().withMessage('Position is required.')
      .isIn(['science', 'math', 'sports', 'admin', 'library'])
      .withMessage('Invalid position selected.'),
    body('coverLetter')
      .optional()
      .trim()
      .isLength({ max: 5000 }).withMessage('Cover letter cannot exceed 5000 characters.'),
  ],
  submitJobApplication
);

/**
 * GET /api/jobs/resume/:id
 * Stream a resume file from GridFS. (Admin-protected in production)
 */
router.get(
  '/jobs/resume/:id',
  [
    param('id')
      .notEmpty().withMessage('File ID is required.')
      .isMongoId().withMessage('Invalid file ID format.'),
  ],
  getResume
);

// ─────────────────────────────────────────────
// PAYMENT ROUTES
// ─────────────────────────────────────────────
/**
 * POST /api/payments
 * Record a fee payment transaction.
 */
router.post(
  '/payments',
  [
    body('studentId')
      .trim()
      .notEmpty().withMessage('Student ID is required.')
      .isLength({ min: 3, max: 50 }).withMessage('Student ID must be 3–50 characters.'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Please provide a valid email address.')
      .normalizeEmail(),
    body('amount')
      .notEmpty().withMessage('Payment amount is required.')
      .isFloat({ min: 1 }).withMessage('Amount must be a positive number.'),
    body('paymentMethod')
      .notEmpty().withMessage('Payment method is required.')
      .isIn(['cc', 'netbanking', 'upi']).withMessage('Invalid payment method.'),
  ],
  submitPayment
);

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
router.get('/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.status(200).json({
    success: true,
    message: 'KIS API is running.',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    memory: {
      heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
    },
  });
});

module.exports = router;
