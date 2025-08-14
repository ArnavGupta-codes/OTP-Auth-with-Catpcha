// routes/otpRoutes.js
const express = require('express');
const otpController = require('../controllers/otpController');
const { verifyOTP } = require('../controllers/verifyOtpController');
const router = express.Router();
router.post('/send-otp', otpController.sendOTP);
router.post('/verify-otp', verifyOTP);
module.exports = router;