// backend/middlewares/loggingMiddleware.js
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../logs/requests.log'), { flags: 'a' });

module.exports = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  logStream.write(log);
  next();
};
