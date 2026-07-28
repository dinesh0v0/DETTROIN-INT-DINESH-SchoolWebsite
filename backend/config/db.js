/**
 * @file db.js
 * @description MongoDB connection with Mongoose and GridFS bucket initialization.
 * Uses a singleton pattern to prevent multiple connections during hot-reloads.
 */

const mongoose = require('mongoose');

let gfsBucket = null;

/**
 * Returns the initialized GridFSBucket instance.
 * Must be called after connectDB() resolves.
 */
const getGfsBucket = () => {
  if (!gfsBucket) {
    throw new Error('GridFSBucket has not been initialized. Call connectDB() first.');
  }
  return gfsBucket;
};

/**
 * Connects to MongoDB and initializes GridFSBucket for file storage.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFSBucket for file (resume) storage
    gfsBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: 'resumes',
    });

    console.log('✅ GridFSBucket initialized (bucket: "resumes")');
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Exit process with failure in production
    process.exit(1);
  }
};

module.exports = { connectDB, getGfsBucket };
