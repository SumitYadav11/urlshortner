// backend/utils/generateShortcode.js
const { v4: uuidv4 } = require('uuid');

function generateShortcode() {
  return uuidv4().slice(0, 6); // returns a 6-character unique code
}

module.exports = generateShortcode;
