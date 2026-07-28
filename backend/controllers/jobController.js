/**
 * @file jobController.js
 * @description Controller for job application submissions and resume retrieval.
 * Uses manual GridFS streaming (buffer → GridFSBucket.openUploadStream) to
 * avoid the multer-gridfs-storage /_id compatibility bug.
 */

const { Readable } = require('stream');
const path = require('path');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const JobApplication = require('../models/JobApplication');
const { getGfsBucket } = require('../config/db');
const {
  sendJobApplicationConfirmation,
  sendJobApplicationAdminNotification,
} = require('../services/emailService');

/**
 * Streams a Buffer into MongoDB GridFS and resolves with the file metadata.
 * @param {Buffer} buffer
 * @param {string} originalName
 * @param {string} mimetype
 * @param {string} uploaderName
 * @returns {Promise<{id, filename, size}>}
 */
const uploadBufferToGridFS = (buffer, originalName, mimetype, uploaderName) => {
  return new Promise((resolve, reject) => {
    const bucket = getGfsBucket();
    const ext = path.extname(originalName).toLowerCase();
    const filename = `resume_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype,
      metadata: {
        originalName,
        uploadedBy: uploaderName || 'unknown',
      },
    });

    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);

    uploadStream.on('finish', () => {
      resolve({
        id: uploadStream.id,
        filename,
        size: buffer.length,
      });
    });

    uploadStream.on('error', (err) => {
      reject(err);
    });
  });
};

/**
 * @route   POST /api/jobs
 * @desc    Submit a new job application with resume upload
 * @access  Public
 */
const submitJobApplication = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array().map((e) => e.msg),
      });
    }

    // Ensure a resume file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'A resume file (PDF, DOC, or DOCX) is required.',
      });
    }

    const { fullName, email, phoneNumber, positionAppliedFor, coverLetter } = req.body;

    // Stream buffer to GridFS
    const fileInfo = await uploadBufferToGridFS(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      fullName
    );

    const jobApp = new JobApplication({
      fullName,
      email,
      phoneNumber,
      positionAppliedFor,
      coverLetter,
      resume: {
        fileId: fileInfo.id,
        filename: fileInfo.filename,
        originalName: req.file.originalname,
        size: fileInfo.size,
        mimetype: req.file.mimetype,
      },
    });

    const saved = await jobApp.save();

    // Send emails non-blocking
    Promise.all([
      sendJobApplicationConfirmation({
        fullName,
        email,
        positionAppliedFor,
        applicationId: saved._id.toString().slice(-8).toUpperCase(),
      }),
      sendJobApplicationAdminNotification({
        fullName,
        email,
        phoneNumber,
        positionAppliedFor,
        applicationId: saved._id.toString().slice(-8).toUpperCase(),
      }),
    ]).catch((err) => console.error('Job email error:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Your application has been received! We will review it and get back to you.',
      data: {
        id: saved._id,
        fullName: saved.fullName,
        positionAppliedFor: saved.positionAppliedFor,
        status: saved.status,
        submittedAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/jobs/resume/:id
 * @desc    Stream a resume file from GridFS by its file ID
 * @access  Protected (add auth middleware in production)
 */
const getResume = async (req, res, next) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const bucket = getGfsBucket();

    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    const file = files[0];
    res.set('Content-Type', file.contentType || 'application/octet-stream');
    res.set('Content-Disposition', `inline; filename="${file.filename}"`);

    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    if (error.name === 'BSONTypeError' || error.name === 'BSONError') {
      return res.status(400).json({ success: false, message: 'Invalid file ID format.' });
    }
    next(error);
  }
};

module.exports = { submitJobApplication, getResume };
