const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email sent! MessageId:", info && info.messageId ? info.messageId : info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: error.message };
  }
};
module.exports = mailSender;