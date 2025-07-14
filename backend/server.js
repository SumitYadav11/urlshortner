// backend/server.js
require('dotenv').config(); // add this at the top

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
