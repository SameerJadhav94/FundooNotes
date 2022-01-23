/* eslint-disable eqeqeq */
/* eslint-disable no-lonely-if */
/* eslint-disable padded-blocks */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const otp = require('./oneTimePassword');
const { logger } = require('../../logger/logger');

const salt = bcrypt.genSaltSync(12);

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleLogin: { type: Boolean },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

const User = mongoose.model('note', userSchema);

class UserModel {
  registerUser = (userDetails, callback) => {
    const newUser = new User();
    newUser.firstName = userDetails.firstName;
    newUser.lastName = userDetails.lastName;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;

    newUser.save()
      .then((data) => {
        callback(null, data);
      })
      .catch(() => {
        callback({ message: 'Error while Storing User Details in DataBase' }, null);
      });
  };

  loginModel = (loginData, callBack) => {
    // To find a user email in the database
    User.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error('Error while loging in');
        return callBack(error, null);
      } else if (data.verified == false) {
        logger.error('Please verify your email');
        return callBack('Please verify your email', null);
      } else {
        if (data.verified == true) {
          logger.info('Email Verified');
          return callBack(null, data);
        } else {
          return callBack(error, null);
        }
      }
    });
  };

  forgotPasswordModel = (emailCheckModel, callBack) => {
    // To find a user email in the database
    User.findOne({ email: emailCheckModel.email }, (error, data) => {
      if (error) {
        return callBack(error, null);
      } if (!data) {
        return callBack('Enter valid email', null);
      }
      return callBack(null, data);
    });
  };

  resetPasswordModel = (PasswordModel, callBack) => {
    // To find code in the database
    otp.findOne({ code: PasswordModel.code }, (error, data) => {
      if (data) {
        if (PasswordModel.code === data.code) {
          // eslint-disable-next-line no-param-reassign
          PasswordModel.password = bcrypt.hashSync(PasswordModel.password, salt);
          // To update password in the database
          User.updateOne({ email: PasswordModel.email }, { $set: { password: PasswordModel.password } }, (err, result) => {
            if (result) {
              return callBack(null, 'Password Updated Successfully');
            }

            return callBack('Error while updating password', null);
          });
        } else {
          return callBack('User Not Found', null);
        }
      } else {
        return callBack('Credential does not match', null);
      }
    });
  };

  verifyUser = (data, callback) => {
    User.findOneAndUpdate({ email: data.email }, { verified: true }, (error, data) => {
      if (error) {
        logger.error('Error Verifying User');
        return callback(error, null);
      }
      logger.info('User Verified');
      return callback(null, data);
    });
  };
}
module.exports = { UserModel: new UserModel(), userDB: User };
