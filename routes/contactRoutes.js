const express = require('express');
const multer = require('multer');
const { contactLimiter } = require('../middleware/rateLimiters');
const { contactValidationRules } = require('../middleware/contactValidation');
const { submitContactForm } = require('../controllers/contactController');

const router = express.Router();
const upload = multer();

router.post('/', contactLimiter, upload.none(), contactValidationRules, submitContactForm);

module.exports = router;
