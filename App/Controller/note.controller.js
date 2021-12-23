const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const mongoose = require('mongoose');

class Controller {
  /**
   * @description: Code for adding user in to the database
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  register = (req, res) => {
    try {
      // let password  = encryption.hashedPassword(req.body.password);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password

      };
      // Registration validation
      const registerValidation = validation.authRegister.validate(user);
      if (registerValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: registerValidation
        })
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'User already exist',
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "User Registered",
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false, message: "Error While Registering",
        data: null,
      });
    }
  }

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
        password: req.body.password
      };

      //Login Validations
      const loginValidation = validation.authLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        res.status(400).send({
          success: false,
          message: loginValidation.error.message
        });
      };

      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'Unable to login. Please enter correct info',
            error
          });
        }
        else {
          if (data) {
            return res.status(200).json({
              success: true,
              message: 'User logged in successfully',
              data: data
            });
          }
          else {
            return res.status(400).json({
              success: false,
              message: 'invalid',
              data: data
            });
          }

        }
      })
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error while Login', error,
        data: null
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
    const userEmail = {
      email: req.body.email,
    }
    console.log('1')
    const emailValidation = validation.authForgotPassword.validate(userEmail)
    console.log('2')
    if (emailValidation.error) {
      console.log('3')
      return res.status(400).send({
        success: false,
        message: 'Wrong Input Validations',
      })
    }
    console.log('4')
      return res.status(200).json({
        success: true,
        message: "email sent successfully",
      });
    
  }
}
module.exports = new Controller();