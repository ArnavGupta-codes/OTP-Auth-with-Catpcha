// controllers/otpController.js (verifyOTP)
const OTP = require('../models/otpModel');

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ CreatedAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { verifyOTP };
