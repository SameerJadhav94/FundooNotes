const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const {logger} = require('../../logger/logger')
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
        logger.error(loginValidation.error)
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
            logger.error("User logged in successfully")
            return res.status(200).json({
              success: true,
              message: 'User logged in successfully',
              data: data
            });
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
    try{
      const userEmail = {
        email: req.body.email,
      }
      const emailValidation = validation.authForgotPassword.validate(userEmail)
      if (emailValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        })
      }
  
      userService.userForgotPassword(userEmail, (error, data)=>{
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'Failed',
          });
        }
        else{
          return res.status(200).json({
            success: true,
            message: "email sent successfully",
            data: data
          });
        }
      })
    }catch (error) {
      return res.status(500).json({
        success: false, message: "Error While Sending Email",
        data: null,
      });
    }
        
  }

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
        code: req.body.code
      }
      const passwordValidation = validation.authResetPassword.validate(userPassword)
      if (passwordValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        })
      }
      userService.userResetPassword(userPassword, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Please Insert Password Properly',
          })
        }
        else {
          return res.status(200).json({
            success: true,
            message: 'Password Reset Successfully',
            data: data
          })
        }
      })     
    }
    catch (error) {
      return res.status(500).json({
        success: false, message: "Error While Resetting Password",
        data: null
      });
    }
  }
}
module.exports = new Controller();