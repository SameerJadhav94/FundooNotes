const userModel = require('../models/model.js')
const userNoteModel = require('../models/note.model')
const encryption = require('../utilities/encryption')
const nodemailer = require('./nodeMailer')
class userService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        const passwordResult = encryption.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {

          return callback("Error ocurred", null);
        }
        else {
          const token = data.generateAuthToken();
          return callback(null, token);
        }

      } else {
        return callback(error, null);
      }
    });
  }
  userForgotPassword = (infoCheck, callback)=>{
    userModel.forgotPasswordModel(infoCheck, (err, data) => {
      if (err) {
        callback(err, null)
      }
      else{
        callback(null, nodemailer.sendEmail(data))
      }
    })
  }

  userResetPassword = (passwordInfo, callback)=>{
    userModel.resetPasswordModel(passwordInfo, (err, data) =>{
      if (err) {
        callback(err, null)
      }
      else{
        callback(null, data)
      }
    })
  }
  createNote = (checkNote, callback)=>{
    userNoteModel.createNoteModel(checkNote, (err, data) =>{
      if (err) {
        callback(err, null)
      }
      else{
        callback(null, data)
      }
    })
  }
}
module.exports = new userService();