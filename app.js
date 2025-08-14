const cors = require('cors');
// Enable CORS for all origins (or specify origin: 'http://localhost:3000' for more security)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const rateLimit = require('express-rate-limit');
// Rate limiter for registration endpoint
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many registration attempts from this IP, please try again after 1 hour.'
  }
});
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/auth_demo';

app.use(express.json());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');

// Use routes
app.use('/api/auth/signup', registerLimiter); // Apply rate limit to signup
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});