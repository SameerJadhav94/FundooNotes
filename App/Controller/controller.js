/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const userService = require('../service/service');
const validation = require('../utilities/validation');
const { logger } = require('../../logger/logger');

class Controller {
  /**
   * @description: Code for adding user in to the database
   * @param {*} req
   * @param {*} res
   * @returns
   */
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,

      };
      // Registration validation
      const registerValidation = validation.authRegister.validate(user);
      if (registerValidation.error) {
        logger.error(registerValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: registerValidation,
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.error('User already exist');
          return res.status(400).json({
            success: false,
            message: 'User already exist',
          });
        }
        logger.info('User Registered');
        return res.status(200).json({
          success: true,
          message: 'User Registered',
          data: {
            verified: data.verified,
            firstname: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error While Registering',
        data: null,
      });
    }
  };

  /**
     * @description: Code for Login
     * @param {*} req
     * @param {*} res
     * @returns
     */
  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      // Login Validations
      const loginValidation = validation.authLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error(loginValidation.error);
        return res.status(400).send({
          success: false,
          message: loginValidation.error.message,
        });
      }

      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          logger.error('Unable to login. Please enter correct info');
          return res.status(400).json({
            success: false,
            message: 'Unable to login. Please enter correct info',
            error,
          });
        }

        logger.info('User logged in successfully');
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data,
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error while Login',
        error,
      });
    }
  };

  /**
   * @description: Code for Forgot Password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  forgotPassword = (req, res) => {
    try {
      const userEmail = {
        email: req.body.email,
      };
      const emailValidation = validation.authForgotPassword.validate(userEmail);
      if (emailValidation.error) {
        logger.error(emailValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        });
      }

      userService.userForgotPassword(userEmail, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'Failed',
          });
        }

        logger.info('email sent successfully');
        return res.status(200).json({
          success: true,
          message: 'email sent successfully',
          data,
        });
      });
    } catch (error) {
      logger.error('Error While Sending Email');
      return res.status(500).json({
        success: false,
        message: 'Error While Sending Email',
        data: null,
      });
    }
  };

  /**
   * @description: Code for Reset Password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  resetPassword(req, res) {
    try {
      const userPassword = {
        email: req.body.email,
        password: req.body.password,
        code: req.body.code,
      };
      const passwordValidation = validation.authResetPassword.validate(userPassword);
      if (passwordValidation.error) {
        logger.error(passwordValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        });
      }
      userService.userResetPassword(userPassword, (error, data) => {
        if (error) {
          logger.error('Please Insert Password Properly');
          return res.status(400).send({
            success: false,
            message: 'Please Insert Password Properly',
          });
        }

        logger.info('Password Reset Successfully');
        return res.status(200).json({
          success: true,
          message: 'Password Reset Successfully',
          data,
        });
      });
    } catch (error) {
      logger.error('Error While Resetting Password');
      return res.status(500).json({
        success: false,
        message: 'Error While Resetting Password',
        data: null,
      });
    }
  }

  verifyUser = (req, res) => {
    try {
      const requestData = {
        token: req.params.token,
      };
      userService.verifyUser(requestData, (error, data) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: 'Error While Verifying',
          });
        }
        return res.status(200).json({
          success: true,
          message: `${data.firstName} your Email Is Successfully Verified!!!, Now you can login to your account.`,
        });
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        data: null,
      });
    }
  };
}
module.exports = new Controller();
