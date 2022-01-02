/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
const nodeMailer = require('nodemailer');
require('dotenv').config();
const otp = require('../models/oneTimePassword');

exports.sendEmail = (messageMail) => {
  // program to generate random strings
  // declare all characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const otpString = generateString(5);

  const otpData = new otp({
    email: messageMail.email,
    code: otpString,
    expireIn: new Date().getTime() + 300 * 1000,
  });

  otpData.save();

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: messageMail.email,
    subject: 'Recovery code for Fundoo Notes Account',
    html: `<div style="text-align: center"><h4>Your one time password (OTP)<br>${otpString}</h4>
    <h5>Security Tip - If you did not request this OTP, or if you feel someone else may be trying to login to your account,
     please change your password immediately.</h5></div>`,
  };

  transporter.sendMail(message, (err, result) => {
    if (err) {
      return err;
    }

    return result.response;
  });
};
