/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    return jwt.sign({ tokenData }, process.env.SECRET_KEY, { expiresIn: '50H' });
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
}
module.exports = new HelperClass();
