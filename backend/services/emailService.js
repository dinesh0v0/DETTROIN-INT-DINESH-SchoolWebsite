/**
 * @file emailService.js
 * @description Nodemailer email service for KIS School Website.
 * Sends confirmation emails to applicants and notification emails to school admin.
 * Uses Gmail SMTP with App Password (set GMAIL_USER and GMAIL_APP_PASSWORD in .env).
 */

'use strict';

const { Resend } = require('resend');

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────
// Generic send helper
// ─────────────────────────────────────────────
const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  Email service: RESEND_API_KEY not set. Emails disabled.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      // Resend free tier requires the sender to be onboarding@resend.dev
      from: 'Krishna International School <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`❌ Email failed to ${to}:`, error.message);
      return;
    }

    console.log(`📧 Email sent to: ${to} | Subject: ${subject}`);
  } catch (err) {
    console.error(`❌ Email failed to ${to}:`, err.message);
  }
};

// ─────────────────────────────────────────────
// Admission Emails
// ─────────────────────────────────────────────

/**
 * Sends a confirmation email to the applicant after admission form submission.
 */
const sendAdmissionConfirmation = async ({ studentName, email, gradeApplyingFor, applicationId }) => {
  await sendEmail({
    to: email,
    subject: `Admission Application Received — Krishna International School`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:2px solid #1a1a1a;max-width:600px;width:100%;">
              <!-- Header -->
              <tr>
                <td style="background:#c0392b;padding:32px 40px;border-bottom:2px solid #1a1a1a;">
                  <p style="margin:0;color:#fff;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">KRISHNA INTERNATIONAL SCHOOL</p>
                  <h1 style="margin:8px 0 0;color:#fff;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:-0.5px;">Application Received</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#1a1a1a;">Dear <strong>${studentName}</strong>,</p>
                  <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#444;">
                    Thank you for applying to <strong>Krishna International School</strong>. We have successfully received your admission application and our admissions team will review it shortly.
                  </p>
                  <!-- Details Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #1a1a1a;margin-bottom:28px;">
                    <tr><td style="background:#f9f7f4;padding:20px 24px;">
                      <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;">Application Details</p>
                      <p style="margin:4px 0;font-size:14px;color:#1a1a1a;"><strong>Student Name:</strong> ${studentName}</p>
                      <p style="margin:4px 0;font-size:14px;color:#1a1a1a;"><strong>Grade Applying For:</strong> ${gradeApplyingFor}</p>
                      <p style="margin:4px 0;font-size:14px;color:#1a1a1a;"><strong>Application ID:</strong> ${applicationId}</p>
                    </td></tr>
                  </table>
                  <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#444;">
                    Our admissions office will contact you at this email address within <strong>3–5 working days</strong> with the next steps in the process.
                  </p>
                  <p style="margin:0;font-size:14px;color:#888;">
                    Please keep your Application ID for future reference.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#1a1a1a;padding:20px 40px;border-top:2px solid #1a1a1a;">
                  <p style="margin:0;color:#888;font-size:12px;">Krishna International School, Aligarh, Uttar Pradesh</p>
                  <p style="margin:4px 0 0;color:#555;font-size:11px;">This is an automated email. Please do not reply to this message.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
};

/**
 * Notifies the school admin about a new admission application.
 */
const sendAdmissionAdminNotification = async ({ studentName, email, gradeApplyingFor, applicationId, dateOfBirth, parentName }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
  await sendEmail({
    to: adminEmail,
    subject: `🆕 New Admission Application — ${studentName} (${gradeApplyingFor})`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f0f0;">
        <table width="600" style="background:#fff;border:2px solid #1a1a1a;margin:auto;">
          <tr><td style="background:#c0392b;padding:24px 32px;border-bottom:2px solid #1a1a1a;">
            <p style="margin:0;color:#fff;font-size:11px;letter-spacing:2px;text-transform:uppercase;">KIS Admin Notification</p>
            <h2 style="margin:6px 0 0;color:#fff;font-size:22px;">New Admission Application</h2>
          </td></tr>
          <tr><td style="padding:32px;">
            <table width="100%" style="border:1px solid #e0e0e0;">
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;width:180px;">Application ID</td><td style="padding:10px 16px;font-size:14px;font-family:monospace;">${applicationId}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Student Name</td><td style="padding:10px 16px;font-size:14px;">${studentName}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Email</td><td style="padding:10px 16px;font-size:14px;">${email}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Date of Birth</td><td style="padding:10px 16px;font-size:14px;">${dateOfBirth}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Parent/Guardian</td><td style="padding:10px 16px;font-size:14px;">${parentName}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Grade Applying</td><td style="padding:10px 16px;font-size:14px;">${gradeApplyingFor}</td></tr>
            </table>
          </td></tr>
          <tr><td style="background:#f5f5f5;padding:16px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:12px;color:#999;">Received via KIS Website • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
};

// ─────────────────────────────────────────────
// Job Application Emails
// ─────────────────────────────────────────────

/**
 * Sends a confirmation email to a job applicant.
 */
const sendJobApplicationConfirmation = async ({ fullName, email, positionAppliedFor, applicationId }) => {
  await sendEmail({
    to: email,
    subject: `Job Application Received — Krishna International School`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:2px solid #1a1a1a;max-width:600px;width:100%;">
              <tr>
                <td style="background:#1a1a1a;padding:32px 40px;border-bottom:2px solid #1a1a1a;">
                  <p style="margin:0;color:#888;font-size:11px;letter-spacing:3px;text-transform:uppercase;">KRISHNA INTERNATIONAL SCHOOL</p>
                  <h1 style="margin:8px 0 0;color:#fff;font-size:28px;font-weight:900;text-transform:uppercase;">Application Received</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">Dear <strong>${fullName}</strong>,</p>
                  <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#444;">
                    Thank you for your interest in joining <strong>Krishna International School</strong>. We have received your application for the position of <strong>${positionAppliedFor}</strong> and will review your resume shortly.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #1a1a1a;margin-bottom:28px;">
                    <tr><td style="background:#f9f7f4;padding:20px 24px;">
                      <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;">Application Details</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Name:</strong> ${fullName}</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Position:</strong> ${positionAppliedFor}</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Application ID:</strong> ${applicationId}</p>
                    </td></tr>
                  </table>
                  <p style="font-size:15px;line-height:1.7;color:#444;">
                    If your qualifications match our requirements, our HR team will reach out within <strong>5–7 working days</strong>.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#1a1a1a;padding:20px 40px;">
                  <p style="margin:0;color:#888;font-size:12px;">Krishna International School, Aligarh, Uttar Pradesh</p>
                  <p style="margin:4px 0 0;color:#555;font-size:11px;">This is an automated email. Please do not reply.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
};

/**
 * Notifies the admin about a new job application.
 */
const sendJobApplicationAdminNotification = async ({ fullName, email, phoneNumber, positionAppliedFor, applicationId }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
  await sendEmail({
    to: adminEmail,
    subject: `🆕 New Job Application — ${fullName} for ${positionAppliedFor}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin:0;padding:20px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f0f0;">
        <table width="600" style="background:#fff;border:2px solid #1a1a1a;margin:auto;">
          <tr><td style="background:#1a1a1a;padding:24px 32px;border-bottom:2px solid #1a1a1a;">
            <p style="margin:0;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;">KIS Admin Notification</p>
            <h2 style="margin:6px 0 0;color:#fff;font-size:22px;">New Job Application</h2>
          </td></tr>
          <tr><td style="padding:32px;">
            <table width="100%" style="border:1px solid #e0e0e0;">
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;width:180px;">Application ID</td><td style="padding:10px 16px;font-size:14px;font-family:monospace;">${applicationId}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Full Name</td><td style="padding:10px 16px;font-size:14px;">${fullName}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Email</td><td style="padding:10px 16px;font-size:14px;">${email}</td></tr>
              <tr><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Phone</td><td style="padding:10px 16px;font-size:14px;">${phoneNumber}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 16px;font-size:13px;color:#888;font-weight:bold;">Position</td><td style="padding:10px 16px;font-size:14px;">${positionAppliedFor}</td></tr>
            </table>
          </td></tr>
          <tr><td style="background:#f5f5f5;padding:16px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:12px;color:#999;">Received via KIS Website • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
};

// ─────────────────────────────────────────────
// Payment Receipt Email
// ─────────────────────────────────────────────

/**
 * Sends a payment receipt email to the payer.
 */
const sendPaymentReceipt = async ({ studentName, email, amount, paymentMethod, transactionId }) => {
  await sendEmail({
    to: email,
    subject: `Fee Payment Receipt — Krishna International School`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:2px solid #1a1a1a;max-width:600px;width:100%;">
              <tr>
                <td style="background:#27ae60;padding:32px 40px;border-bottom:2px solid #1a1a1a;">
                  <p style="margin:0;color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:3px;text-transform:uppercase;">KRISHNA INTERNATIONAL SCHOOL</p>
                  <h1 style="margin:8px 0 0;color:#fff;font-size:28px;font-weight:900;text-transform:uppercase;">Payment Receipt</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">Dear <strong>${studentName}</strong>,</p>
                  <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#444;">
                    We have successfully received your fee payment. Please keep this receipt for your records.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #1a1a1a;margin-bottom:28px;">
                    <tr><td style="background:#f9f7f4;padding:20px 24px;">
                      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;">Payment Details</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Transaction ID:</strong> <span style="font-family:monospace">${transactionId}</span></p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Student Name:</strong> ${studentName}</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Amount:</strong> <span style="color:#27ae60;font-size:18px;font-weight:bold;">₹${amount}</span></p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Payment Method:</strong> ${paymentMethod}</p>
                      <p style="margin:4px 0;font-size:14px;"><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#1a1a1a;padding:20px 40px;">
                  <p style="margin:0;color:#888;font-size:12px;">Krishna International School, Aligarh, Uttar Pradesh</p>
                  <p style="margin:4px 0 0;color:#555;font-size:11px;">This is an automated receipt. Please do not reply.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
};

module.exports = {
  sendAdmissionConfirmation,
  sendAdmissionAdminNotification,
  sendJobApplicationConfirmation,
  sendJobApplicationAdminNotification,
  sendPaymentReceipt,
};
