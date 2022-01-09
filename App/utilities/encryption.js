/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

class HelperClass {
  comparePassword = (password, result) => bcrypt.compareSync(password, result);

  token = (data) => {
    const tokenData = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
    };
    return jwt.sign({ tokenData }, process.env.SECRET_KEY, { expiresIn: '600H' });
  };

  validateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const elements = header.split(' ');
    const token = elements[1];
    try {
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decipher) => {
          if (error) {
            return res.status(400).send(
              {
                message: 'Send Correct Token',
                success: false,
              },
            );
          }
          req.user = decipher;
          next();
        });
      } else {
        return res.status(401).send({ success: false, message: 'Attention!!! Cannot Verify User' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Something went wrong!' });
    }
  };

  sendWelcomeMail = (data) => {
    try {
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      // send mail
      transporter.sendMail({
        from: '"Fundoo Notes" <no-reply@fundoonotes.com>',
        to: data.email,
        subject: 'Welcome To Fundoo Notes.',
        text: `Hello ${data.firstName}.`,
        html: `<b>Hello ${data.firstName} !!! <br> <h3> Welcome to Fundoo notes.</h3> <br>Your account has been created successfully, Please Login in to use fundoo notes.<br></b>`,
      });
    } catch (error) {
      return error;
    }
  };

  jwtTokenVerifyMail = (payload, secretkey, callback) => {
    jwt.sign(
      { email: payload.email },
      secretkey,
      { expiresIn: '600h' },
      (err, token) => {
        if (err) {
          return callback('token not generated', null);
        }
        return callback(null, token);
      },
    );
  };
}
module.exports = new HelperClass();
