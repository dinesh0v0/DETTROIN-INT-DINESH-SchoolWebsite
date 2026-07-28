/**
 * @file Admission.js
 * @description Mongoose schema for school admission applications.
 */

const mongoose = require('mongoose');

const GRADE_LEVELS = ['pre-primary', 'primary', 'middle', 'senior'];

const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required.'],
      trim: true,
      minlength: [2, 'Student name must be at least 2 characters.'],
      maxlength: [100, 'Student name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required.'],
      validate: {
        validator: function (dob) {
          // Student must be at least 3 years old and under 20
          const age = (Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
          return age >= 3 && age <= 20;
        },
        message: 'Student age must be between 3 and 20 years.',
      },
    },
    parentGuardianName: {
      type: String,
      required: [true, 'Parent/Guardian name is required.'],
      trim: true,
      minlength: [2, 'Parent name must be at least 2 characters.'],
      maxlength: [100, 'Parent name cannot exceed 100 characters.'],
    },
    gradeApplyingFor: {
      type: String,
      required: [true, 'Grade applying for is required.'],
      enum: {
        values: GRADE_LEVELS,
        message: `Grade must be one of: ${GRADE_LEVELS.join(', ')}.`,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

// Index for efficient querying by grade and status
admissionSchema.index({ gradeApplyingFor: 1, status: 1 });
admissionSchema.index({ createdAt: -1 });

const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
