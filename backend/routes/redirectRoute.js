// routes/redirectRoute.js
const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/urlModel');
const geoip = require('../utils/geoLocation');

router.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const entry = await ShortUrl.findOne({ shortcode });

    if (!entry) return res.status(404).json({ error: 'Shortcode not found' });
    if (entry.expiry < new Date()) return res.status(410).json({ error: 'Shortcode expired' });

    const referrer = req.get('Referrer') || 'direct';
    const location = await geoip(req.ip);

    entry.clicks.push({ timestamp: new Date(), referrer, location });
    entry.clickCount += 1;
    await entry.save();

    return res.redirect(entry.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Redirection failed' });
  }
});

module.exports = router;
