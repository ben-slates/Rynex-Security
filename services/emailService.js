const nodemailer = require('nodemailer');
const { buildAdminEmail, buildConfirmationEmail } = require('../utils/emailTemplates');

const createTransporter = () => {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    const error = new Error(`Email service is not configured: ${missing.join(', ')}`);
    error.status = 500;
    throw error;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const sendContactNotification = async (data, metadata, web3Result) => {
  const transporter = createTransporter();
  const mailTo = process.env.MAIL_TO || 'info@rynexsecurity.com';
  const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;

  return transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    replyTo: data.email,
    subject: data.subject || `New contact request from ${data.name}`,
    html: buildAdminEmail(data, metadata, web3Result)
  });
};

const sendVisitorConfirmation = async (data, metadata) => {
  const transporter = createTransporter();
  const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;

  return transporter.sendMail({
    from: mailFrom,
    to: data.email,
    subject: 'Rynex Security received your message',
    html: buildConfirmationEmail(data, metadata)
  });
};

module.exports = { sendContactNotification, sendVisitorConfirmation };
