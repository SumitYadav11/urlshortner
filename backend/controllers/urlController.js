const ShortUrl = require('../models/urlModel');
const generateShortcode = require('../utils/generateShortcode');
const validator = require('validator');

/**
 * Create a new shortened URL
 * POST /shorturls
 */
exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    // Validate URL format
    if (!url || !validator.isURL(url)) {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    // Validate validity (if provided)
    if (validity && (!Number.isInteger(validity) || validity <= 0)) {
      return res.status(400).json({ error: 'Validity must be a positive integer (minutes)' });
    }

    // Generate or accept shortcode
    let finalShortcode = shortcode || generateShortcode();

    // Check for shortcode conflict
    const existing = await ShortUrl.findOne({ shortcode: finalShortcode });
    if (existing) {
      return res.status(409).json({ error: 'Shortcode already in use' });
    }

    // Compute expiry time
    const expiryDate = new Date(Date.now() + validity * 60000);

    // Create DB entry
    const newShort = await ShortUrl.create({
      originalUrl: url,
      shortcode: finalShortcode,
      expiry: expiryDate
    });

    // Return shortened link and expiry
    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${finalShortcode}`,
      expiry: expiryDate.toISOString()
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Get all existing short URLs
 * GET /shorturls
 */
exports.getAllShortUrls = async (req, res) => {
  try {
    const urls = await ShortUrl.find().sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch short URLs' });
  }
};
