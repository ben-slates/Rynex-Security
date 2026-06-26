const { validationResult, matchedData } = require('express-validator');
const { submitToWeb3Forms } = require('../services/web3FormsService');
const { sendContactNotification, sendVisitorConfirmation } = require('../services/emailService');

const submitContactForm = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: errors.array().map((error) => ({ field: error.path, message: error.msg }))
    });
  }

  const data = matchedData(req, { locations: ['body'] });

  if (data.website) {
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  }

  const metadata = {
    timestamp: new Date().toISOString(),
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || 'Unknown'
  };

  try {
    let web3Result;

    try {
      web3Result = await submitToWeb3Forms(data, metadata);
    } catch (web3Error) {
      web3Result = {
        success: false,
        message: web3Error.message || 'Web3Forms fallback path used.'
      };
    }

    await sendContactNotification(data, metadata, web3Result);
    await sendVisitorConfirmation(data, metadata);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. We will contact you shortly.'
    });
  } catch (error) {
    error.status = error.status || 502;
    return next(error);
  }
};

module.exports = { submitContactForm };
