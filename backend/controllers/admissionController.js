/**
 * @file admissionController.js
 * @description Controller for handling admission form submissions.
 * Saves to MongoDB and sends confirmation + admin notification emails.
 */

'use strict';

const { validationResult } = require('express-validator');
const Admission = require('../models/Admission');
const {
  sendAdmissionConfirmation,
  sendAdmissionAdminNotification,
} = require('../services/emailService');

/**
 * @route   POST /api/admissions
 * @desc    Submit a new admission application
 * @access  Public
 */
const submitAdmission = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const { studentName, email, dateOfBirth, parentGuardianName, gradeApplyingFor } = req.body;

    // Save to database
    const admission = new Admission({
      studentName,
      email,
      dateOfBirth,
      parentGuardianName,
      gradeApplyingFor,
    });

    const saved = await admission.save();
    const applicationId = saved._id.toString().slice(-8).toUpperCase();

    // Send emails in parallel — non-blocking, never crash the response
    Promise.all([
      sendAdmissionConfirmation({
        studentName,
        email,
        gradeApplyingFor,
        applicationId,
      }),
      sendAdmissionAdminNotification({
        studentName,
        email,
        gradeApplyingFor,
        applicationId,
        dateOfBirth: new Date(dateOfBirth).toLocaleDateString('en-IN'),
        parentName: parentGuardianName,
      }),
    ]).catch((err) => console.error('Email dispatch error:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Your admission application has been submitted successfully! A confirmation email has been sent to you.',
      data: {
        id: saved._id,
        applicationId,
        studentName: saved.studentName,
        gradeApplyingFor: saved.gradeApplyingFor,
        status: saved.status,
        submittedAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitAdmission };
