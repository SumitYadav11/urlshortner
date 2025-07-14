// backend/models/urlModel.js
const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: { type: String, default: 'direct' },
  location: { type: String, default: 'unknown' }
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, required: true },
  clickCount: { type: Number, default: 0 },
  clicks: [clickSchema]
});

module.exports = mongoose.model('ShortUrl', urlSchema);
