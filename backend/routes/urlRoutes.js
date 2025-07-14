const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getAllShortUrls
} = require('../controllers/urlController');
const { getShortUrlStats } = require('../controllers/statsController');

router.post('/', createShortUrl);
router.get('/', getAllShortUrls); // 👈 new route to list all short URLs
router.get('/:shortcode', getShortUrlStats);

module.exports = router;
