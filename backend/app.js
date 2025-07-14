const express = require('express');
const cors = require('cors');
const app = express();

const loggingMiddleware = require('./middlewares/loggingMiddleware');
const urlRoutes = require('./routes/urlRoutes');
const redirectRoute = require('./routes/redirectRoute');

app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// API Routes
app.use('/shorturls', urlRoutes);

// Redirection Route (must be AFTER API routes)
app.use('/', redirectRoute);

module.exports = app;
