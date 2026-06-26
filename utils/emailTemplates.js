const fieldRow = (label, value) => `
  <tr>
    <td style="padding:10px 0;color:#64748b;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;color:#111827;font-weight:600;">${value || 'Not provided'}</td>
  </tr>`;

const resolveBaseUrl = () => {
  const raw = String(process.env.BASE_URL || '').trim();
  if (/^https?:\/\//i.test(raw) && !/localhost|127\.0\.0\.1/.test(raw)) {
    return raw.replace(/\/$/, '');
  }
  return 'https://rynexsecurity.com';
};

const logoSrc = process.env.MAIL_LOGO_URL || `${resolveBaseUrl()}/images/logo.png`;

const buildShell = (preheader, body) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rynex Security</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:28px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#000000;padding:30px;text-align:center;">
              <img src="${logoSrc}" width="55" alt="Rynex Security" style="display:inline-block;">
              <h2 style="margin:15px 0 5px;color:#ffffff;">Rynex Security</h2>
              <p style="margin:0;color:#00C2FF;font-size:14px;">Detect . Exploit . Secure</p>
            </td>
          </tr>
          ${body}
          <tr>
            <td style="background:#000000;color:#94A3B8;text-align:center;padding:25px;font-size:13px;">
              <strong style="color:#ffffff;">Rynex Security</strong><br>
              Offensive Security &bull; Penetration Testing &bull; Cloud Security<br><br>
              <a href="https://rynexsecurity.com" style="color:#00C2FF;text-decoration:none;">www.rynexsecurity.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const buildAdminEmail = (data, metadata) => buildShell(
  `New contact form submission from ${data.name}`,
  `<tr>
    <td style="padding:36px;color:#374151;line-height:1.7;">
      <h2 style="margin:0 0 18px;color:#111827;">New Contact Submission</h2>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${fieldRow('Name', data.name)}
        ${fieldRow('Email', data.email)}
        ${fieldRow('Subject', data.subject)}
        ${fieldRow('Timestamp', metadata.timestamp)}
        ${fieldRow('User Agent', metadata.userAgent)}
      </table>
      <div style="margin-top:28px;padding:18px;background:#f8fafc;border-left:4px solid #00C2FF;border-radius:6px;">
        <strong style="color:#111827;">Message</strong>
        <p style="white-space:pre-wrap;margin:12px 0 0;color:#374151;">${data.message}</p>
      </div>
    </td>
  </tr>`
);

const buildConfirmationEmail = (data) => buildShell(
  'Your message has been received.',
  `<tr>
    <td style="padding:40px;color:#374151;line-height:28px;">
      <h2 style="margin-top:0;color:#111827;">Hi ${data.name},</h2>
      <p>Thank you for contacting <strong>Rynex Security</strong>.</p>
      <p>This email confirms that we have successfully received your inquiry. A member of our cybersecurity team is reviewing your request and will get back to you as soon as possible.</p>
      <table width="100%" cellpadding="15" cellspacing="0" role="presentation" style="margin:30px 0;background:#F8FAFC;border-left:4px solid #00C2FF;border-radius:6px;">
        <tr>
          <td style="font-size:15px;color:#475569;">
            <strong>What happens next?</strong><br><br>
            Your inquiry has been received.<br>
            Our team is reviewing the details.<br>
            We will respond within <strong>24 business hours.</strong>
          </td>
        </tr>
      </table>
      <p>We appreciate your interest in Rynex Security and look forward to assisting you.</p>
      <p style="margin-top:35px;">Regards,<br><strong>Rynex Security Team</strong></p>
    </td>
  </tr>`
);

module.exports = { buildAdminEmail, buildConfirmationEmail };
