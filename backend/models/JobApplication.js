/**
 * @file JobApplication.js
 * @description Mongoose schema for job/career applications from the JoinUs page.
 * Stores a GridFS file ID reference for the uploaded resume.
 */

const mongoose = require('mongoose');

const POSITIONS = ['science', 'math', 'sports', 'admin', 'library'];

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [100, 'Name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address.',
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      match: [/^[+\d][\d\s\-().]{6,19}$/, 'Please provide a valid phone number.'],
    },
    positionAppliedFor: {
      type: String,
      required: [true, 'Position is required.'],
      enum: {
        values: POSITIONS,
        message: `Position must be one of: ${POSITIONS.join(', ')}.`,
      },
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, 'Cover letter cannot exceed 5000 characters.'],
    },
    // Stores GridFS file metadata for the uploaded resume
    resume: {
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'A resume file is required.'],
      },
      filename: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
      },
      mimetype: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ['received', 'shortlisted', 'rejected', 'hired'],
      default: 'received',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for efficient filtering by position and status
jobApplicationSchema.index({ positionAppliedFor: 1, status: 1 });
jobApplicationSchema.index({ email: 1 });
jobApplicationSchema.index({ createdAt: -1 });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
