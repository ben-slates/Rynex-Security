const express = require('express');
const path = require('path');
const { pages } = require('../config/pages');

const router = express.Router();

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '..', 'robots.txt'));
});

router.get('/favicon.ico', (req, res) => {
  res.redirect(301, '/images/favicon.png');
});

router.get('/sitemap.xml', (req, res) => {
  const baseUrl = (process.env.BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
  const urls = pages.map((page) => `
  <url>
    <loc>${baseUrl}${page.route}</loc>
    <changefreq>${page.route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page.route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`);
});

module.exports = router;
