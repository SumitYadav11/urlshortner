// backend/utils/geoLocation.js
const https = require('https');

module.exports = async function geoip(ip) {
  return new Promise((resolve) => {
    https.get(`https://ip-api.com/json/${ip}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(`${json.city || ''}, ${json.country || ''}`.trim());
        } catch {
          resolve('unknown');
        }
      });
    }).on('error', () => resolve('unknown'));
  });
};
