/**
 * @file paymentController.js
 * @description Controller for handling fee payment submissions.
 * Saves to MongoDB and sends payment receipt email.
 */

'use strict';

const { validationResult } = require('express-validator');
const Payment = require('../models/Payment');
const { sendPaymentReceipt } = require('../services/emailService');

/**
 * @route   POST /api/payments
 * @desc    Record a fee payment transaction
 * @access  Public
 */
const submitPayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const { studentId, email, amount, paymentMethod } = req.body;

    const payment = new Payment({
      studentId,
      email,
      amount: Number(amount),
      paymentMethod,
    });

    const saved = await payment.save();

    // Send receipt email — non-blocking
    sendPaymentReceipt({
      studentName: studentId,
      email,
      amount,
      paymentMethod,
      transactionId: saved.transactionId,
    }).catch((err) => console.error('Payment email error:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Payment recorded successfully! Your transaction ID is attached below.',
      data: {
        id: saved._id,
        transactionId: saved.transactionId,
        studentId: saved.studentId,
        amount: saved.amount,
        paymentMethod: saved.paymentMethod,
        status: saved.status,
        paidAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitPayment };
