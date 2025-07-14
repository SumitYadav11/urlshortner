// backend/controllers/statsController.js
const ShortUrl = require('../models/urlModel');

exports.getShortUrlStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const entry = await ShortUrl.findOne({ shortcode });

    if (!entry) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    return res.status(200).json({
      originalUrl: entry.originalUrl,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      clickCount: entry.clickCount,
      clicks: entry.clicks
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve stats' });
  }
};
