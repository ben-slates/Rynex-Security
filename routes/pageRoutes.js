const express = require('express');
const { renderPage } = require('../controllers/pageController');
const { pages } = require('../config/pages');

const router = express.Router();

for (const page of pages) {
  router.get(page.route, renderPage(page));
  router.get(`/${page.file}`, (req, res) => {
    res.redirect(301, page.route);
  });
}

module.exports = router;
