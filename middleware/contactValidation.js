const { body } = require('express-validator');

const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.')
    .escape(),
  body('email')
    .trim()
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail({ gmail_remove_dots: false }),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 40 }).withMessage('Phone number is too long.')
    .escape(),
  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 120 }).withMessage('Company name is too long.')
    .escape(),
  body('subject')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 160 }).withMessage('Subject is too long.')
    .escape(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 4000 }).withMessage('Message must be between 10 and 4000 characters.')
    .escape(),
  body('website')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .escape()
];

module.exports = { contactValidationRules };
