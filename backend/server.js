/**
 * @file server.js
 * @description Production-grade Express server entry point for KIS School Website.
 * Handles middleware configuration, routes, and graceful shutdown.
 */

'use strict';

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


const { connectDB } = require('./config/db');
const apiRouter = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

// ─────────────────────────────────────────────
// App Initialization
// ─────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1); // Trust reverse proxy (Render)
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ─────────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────────
app.use(helmet());

// CORS: Allow localhost, any *.vercel.app deploy URL, and the configured FRONTEND_URL
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,            // Any local dev port
  /^https:\/\/[\w-]+\.vercel\.app$/,     // Any Vercel preview / production URL
];
if (FRONTEND_URL && FRONTEND_URL !== 'wait') {
  allowedOrigins.push(FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests (Postman, server-to-server, health checks)
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some((rule) =>
        rule instanceof RegExp ? rule.test(origin) : rule === origin
      );
      return callback(null, allowed);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─────────────────────────────────────────────
// Request Parsing Middleware
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Prevent large JSON payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─────────────────────────────────────────────
// Logging Middleware
// ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.use('/api', apiRouter);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────
// Centralized Error Handler (must be LAST)
// ─────────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
const startServer = async () => {
  // Connect to MongoDB first, then start listening
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`\n🚀 KIS Backend server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`   Server: http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });

  // ─────────────────────────────────────────────
  // Graceful Shutdown
  // ─────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });

    // Force shutdown if it takes too long
    setTimeout(() => {
      console.error('⚠️  Could not close connections in time. Forcing exit.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️  Unhandled Rejection:', reason);
    server.close(() => process.exit(1));
  });
};

startServer();
