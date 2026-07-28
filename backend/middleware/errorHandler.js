/**
 * @file errorHandler.js
 * @description Centralized, production-grade error handling middleware.
 * Catches all errors passed via next(err) and returns a consistent JSON response.
 */

const errorHandler = (err, req, res, next) => {
  // Log the full error in development for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ Error:', err);
  } else {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${err.message}`);
  }

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists.`,
    });
  }

  // Handle Mongoose Cast Errors (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field: ${err.path}.`,
    });
  }

  // Handle Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File too large. Maximum size is 5MB.',
    });
  }

  if (err.message && (err.message.includes('Invalid file type') || err.message.includes('Only PDF'))) {
    return res.status(415).json({
      success: false,
      message: err.message,
    });
  }

  // Default to 500 Internal Server Error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : err.message || 'An internal server error occurred.',
  });
};

module.exports = errorHandler;
