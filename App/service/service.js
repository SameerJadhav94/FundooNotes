const userModel = require('../models/model.js').UserModel
const userNoteModel = require('../models/note.model').NoteModel
const encryption = require('../utilities/encryption')
const nodemailer = require('./nodeMailer')
const {logger} = require('../../logger/logger');
class userService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        logger.error("Error Registering User: " + err)
        callback(err, null);
      } else {
        logger.info("User registered")
        callback(null, data);
      }
    });
  }
  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        const passwordResult = encryption.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error("Error logging in")
          return callback("Error ocurred", null);
        }
        else {
          const token = encryption.token(data)
          logger.info("Login successfully")
          return callback(null, token);
        }

      } else {
        logger.error("Error ocurred")
        return callback(error, null);
      }
    });
  }
  userForgotPassword = (infoCheck, callback)=>{
    userModel.forgotPasswordModel(infoCheck, (err, data) => {
      if (err) {
        logger.error("Could not send Email")
        callback(err, null)
      }
      else{
        logger.info("Email sent successfully")
        callback(null, nodemailer.sendEmail(data))
      }
    })
  }

  userResetPassword = (passwordInfo, callback)=>{
    userModel.resetPasswordModel(passwordInfo, (err, data) =>{
      if (err) {
        logger.error("Error resetting password")
        callback(err, null)
      }
      else{
        logger.info("Password reseted")
        callback(null, data)
      }
    })
  }
  createNote = (checkNote, callback)=>{
    userNoteModel.createNoteModel(checkNote, (err, data) =>{
      if (err) {
        logger.error("Error creating note")
        callback(err, null)
      }
      else{
        logger.info("Note create")
        callback(null, data)
      }
    })
  }

  getNote = (checkId, callback)=>{
    userNoteModel.getNoteModel(checkId, (err, data) =>{
      if (data) {
        logger.info("Your Note")
        callback(null, data)
      }
      else {
        logger.error("Cannot fetch notes")
        callback(err, null)
      }
    }) 
  }

  getNoteByID = (getNoteByid, callback)=>{
    userNoteModel.getNoteByIDModel(getNoteByid, (err, data)=>{
      if (data) {
        logger.info("Your Note")
        callback(null, data)
      }
      else{
        logger.error("Cannot fetch note")
        callback (err, null)
      }
    })
  }

  updateNote = (updateNote, callback)=>{
    userNoteModel.updateNoteModel(updateNote, (err, data)=>{
      if (err) {
        logger.error("Error updating note")
        callback(err, null)
      }else{
        logger.info("Note updated")
        callback(null, data)
      }
    })
  }
  deleteNote = async(noteId)=>{
    const delNote = await userNoteModel.deleteNoteModel(noteId)
    if (!delNote) {
      logger.error("Error deleting note")
      return false
    }
    else{
      logger.info("Note deleted successfully")
      return delNote
    }
  }
}

module.exports = new userService();