/**
 * @file mailer.js
 * @description Email service using Nodemailer for sending automated confirmations and admin notifications.
 */

const nodemailer = require('nodemailer');

// Initialize transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST ? undefined : 'gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper for generating the branded HTML template
const getEmailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FDFBF7; font-family: Arial, sans-serif; color: #1A1A1A;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FDFBF7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 2px solid #1A1A1A; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #E63946; padding: 24px; text-align: center; border-bottom: 2px solid #1A1A1A;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Krishna International School</h1>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 24px; font-size: 16px; line-height: 1.6;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f1f1; padding: 16px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e0e0e0;">
              This is an automated message from Krishna International School. Please do not reply directly to this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Send an email using the branded template.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject line.
 * @param {string} content - HTML content to inject into the template body.
 */
const sendMail = async (to, subject, content) => {
  // If credentials are missing (e.g. testing), just log and skip
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ EMAIL_USER or EMAIL_PASS not set. Skipping email send to:', to);
    return;
  }

  const html = getEmailTemplate(subject, content);

  try {
    const info = await transporter.sendMail({
      from: '"Krishna International School" <noreply@school.edu>',
      to,
      subject,
      html,
    });
    console.log(`✉️ Email sent to ${to} [MessageId: ${info.messageId}]`);
    if (process.env.EMAIL_HOST && process.env.EMAIL_HOST.includes('ethereal')) {
      console.log(`🌐 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendMail,
};
