const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/ai', require('./routes/aiMatching'));
app.use('/api/estimates', require('./routes/estimates'));
app.use('/api/rates', require('./routes/rates'));
app.use('/api/vendors', require('./routes/vendors'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => {
  console.log(`🔷 AmalGus API Server running on port ${PORT}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

module.exports = app;
