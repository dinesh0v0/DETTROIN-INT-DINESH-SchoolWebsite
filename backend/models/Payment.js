/**
 * @file Payment.js
 * @description Mongoose schema for fee payment records.
 * Note: This records the payment attempt/transaction. In production, this should
 * be integrated with a payment gateway (e.g., Razorpay) for actual processing.
 */

const mongoose = require('mongoose');

const PAYMENT_METHODS = ['cc', 'netbanking', 'upi'];
const PAYMENT_STATUSES = ['pending', 'success', 'failed'];

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID or Application ID is required.'],
      trim: true,
      minlength: [3, 'Student ID must be at least 3 characters.'],
      maxlength: [50, 'Student ID cannot exceed 50 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    amount: {
      type: Number,
      required: [true, 'Payment amount is required.'],
      min: [1, 'Amount must be at least ₹1.'],
      max: [10000000, 'Amount cannot exceed ₹1,00,00,000.'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required.'],
      enum: {
        values: PAYMENT_METHODS,
        message: `Payment method must be one of: ${PAYMENT_METHODS.join(', ')}.`,
      },
    },
    status: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: 'success', // Mocked as success for now
    },
    // In production, this would store the gateway transaction ID (e.g., Razorpay order ID)
    transactionId: {
      type: String,
      default: function () {
        return `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for efficient lookup by student
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ createdAt: -1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
