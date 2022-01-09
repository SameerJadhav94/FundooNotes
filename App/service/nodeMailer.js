/* eslint-disable no-shadow */
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
exports.verifyMail = (token, data) => {
  const link = `http://localhost:${process.env.PORT}/verify/${token}`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = {
    from: '"Fundoo Notes" <no-reply@fundoonotes.com>',
    to: data.email,
    subject: 'Email Verification For Fundoo Account',
    html: `<b><h2> Hello  ${data.firstName}, </h2><br><h1> Please click on the button below to verify your email address.:</h1>
    <br> <button href="${link}" 
    style ="background-color: #F08080; border: none;color: white;padding: 10px; text-align: center; border-radius: 14px;text-decoration: none;
  display: inline-block; font-size: 16px;margin: 4px 2px;cursor: pointer;" ><a href="${link}"  style = "text-decoration: none;"  
  onMouseOver="this.style.color='#0F0'" onMouseOut="this.style.color='#00F'">Verify Email </a></button></b>`,
  };

  // send mail with defined transporter object
  transporter.sendMail(info, (err, info) => {
    if (err) {
      return false;
    }
    return info.response;
  });
};
