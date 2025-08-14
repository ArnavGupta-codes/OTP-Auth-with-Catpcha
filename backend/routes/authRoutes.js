const express = require('express');
const authController = require('../controllers/authcontroller');
const { RecaptchaV2 } = require('express-recaptcha');
const router = express.Router();

const recaptcha = new RecaptchaV2(
	process.env.RECAPTCHA_SITE_KEY,
	process.env.RECAPTCHA_SECRET_KEY
);

router.post('/signup', recaptcha.middleware.verify, authController.signup);
module.exports = router;