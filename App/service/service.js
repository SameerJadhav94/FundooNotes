/* eslint-disable class-methods-use-this */
const userModel = require('../models/model').UserModel;
const userNoteModel = require('../models/note.model').NoteModel;
const userLabelModel = require('../models/label.model')
const encryption = require('../utilities/encryption');
const nodemailer = require('./nodeMailer');
const { logger } = require('../../logger/logger');

class UserService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        logger.error(`Error Registering User: ${err}`);
        callback(err, null);
      } else {
        logger.info('User registered');
        callback(null, data);
      }
    });
  };

  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        const passwordResult = encryption.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error('Error logging in');
          return callback('Error ocurred', null);
        }

        const token = encryption.token(data);
        logger.info('Login successfully');
        return callback(null, token);
      }
      logger.error('Error ocurred');
      return callback(error, null);
    });
  };

  userForgotPassword = (infoCheck, callback) => {
    userModel.forgotPasswordModel(infoCheck, (err, data) => {
      if (err) {
        logger.error('Could not send Email');
        callback(err, null);
      } else {
        logger.info('Email sent successfully');
        callback(null, nodemailer.sendEmail(data));
      }
    });
  };

  userResetPassword = (passwordInfo, callback) => {
    userModel.resetPasswordModel(passwordInfo, (err, data) => {
      if (err) {
        logger.error('Error resetting password');
        callback(err, null);
      } else {
        logger.info('Password reseted');
        callback(null, data);
      }
    });
  };

  createNote = (checkNote) => new Promise((resolve, reject) => {
    const result = userNoteModel.createNoteModel(checkNote);
    result.then((data) => {
      logger.info('Note create');
      resolve(data);
    }).catch((error) => {
      logger.error('Error creating note');
      reject(error);
    });
  });

  getNote = (checkId) => new Promise((resolve, reject) => {
    const result = userNoteModel.getNoteModel(checkId);
    result.then((data) => {
      logger.info('Your Note');
      resolve(data);
    }).catch((error) => {
      logger.error('Cannot fetch notes');
      reject(error);
    });
  });

  getNoteByID = (getNoteByid, callback) => {
    userNoteModel.getNoteByIDModel(getNoteByid, (err, data) => {
      if (data) {
        logger.info('Your Note');
        callback(null, data);
      } else {
        logger.error('Cannot fetch note');
        callback(err, null);
      }
    });
  };

  updateNote = (updateNote, callback) => {
    userNoteModel.updateNoteModel(updateNote, (err, data) => {
      if (err) {
        logger.error('Error updating note');
        callback(err, null);
      } else {
        logger.info('Note updated');
        callback(null, data);
      }
    });
  };

  deleteNote = async (noteId) => {
    const delNote = await userNoteModel.deleteNoteModel(noteId);
    if (!delNote) {
      logger.error('Error deleting note');
      return false;
    }

    logger.info('Note deleted successfully');
    return delNote;
  };

  addLabel = async (label) => {
    const addLabel = await userLabelModel.addLabelModel(label);
    if (!addLabel) {
      logger.error('Error adding label');
      return false;
    }
    else{
      logger.info('Label Added Successfully')
      return addLabel;
    }
  }

  getLabelService = async (label) => {
    const getLabel = await userLabelModel.getLabelModel(label);
    if (!getLabel) {
      logger.error('Error getting label')
      return false;
    }
    else{
      logger.info('Get Labels Successfully')
      return getLabel;
    }
  }

  getLabelByIdService = async (labelId) => {
    const getLabelById = await userLabelModel.getLabelByIdModel(labelId);
    if (!getLabelById) {
      logger.error('Error getting label from id')
      return false;
    }
    else{
      logger.info('Fetched Label By Id Successfully')
      return getLabelById
    }
  }

  updateLabelByIdService = (labelId) => new Promise((resolve, reject) => {
    const updateLable = userLabelModel.updateLabelByIdModel(labelId)
    updateLable.then((label) =>{
      logger.info('Label Updated Successfully')
      resolve(label)
    }).catch((error) =>{
      logger.error('Error Updating Label')
      reject(error)
    })
  });
  deleteLabelByIdService = (deleteLabel, callback) => {
    if (!deleteLabel) {
      return callback(error, null);     
    }
    else{
      return callback(null, deleteLabel);
    }
  }
}

module.exports = new UserService();
