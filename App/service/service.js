/* eslint-disable class-methods-use-this */
const userModel = require('../models/model').UserModel;
const userNoteModel = require('../models/note.model').NoteModel;
const userLabelModel = require('../models/label.model');
const encryption = require('../utilities/encryption');
const nodemailer = require('./nodeMailer');
const { logger } = require('../../logger/logger');
const redisServer = require('../utilities/redis.utilities');
// eslint-disable-next-line no-unused-vars

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

  getNoteByID = async (noteId, userId) => {
    const note = await redisServer.getData(noteId);
    if (note) {
      logger.info('Note Returned From cache');
      return note;
    }
    const noteFromDB = await userNoteModel.getNoteByIDModel(noteId, userId);
    if (!noteFromDB) {
      logger.error('Cannot fetch note');
      return false;
    }
    logger.info('Fetched Note Successfully From DB and setting it to cache.', noteId);
    await redisServer.setData(noteId, 120, JSON.stringify(noteFromDB));
    return noteFromDB;
  };

  updateNote = (updateNote, callback) => {
    userNoteModel.updateNoteModel(updateNote, (err, data) => {
      if (err) {
        logger.error('Error updating note');
        callback(err, null);
      } else {
        logger.info('Note updated');
        redisServer.clearCache(updateNote.id);
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
    logger.info('Note deleted successfully, Cleared Cache successfully');
    redisServer.clearCache(noteId.noteId);
    return delNote;
  };

  addLabel = async (label) => {
    const addLabel = await userLabelModel.addLabelModel(label);
    if (!addLabel) {
      logger.error('Error adding label');
      return false;
    }

    logger.info('Label Added Successfully');
    return addLabel;
  };

  getLabelService = async (label) => {
    const getLabel = await userLabelModel.getLabelModel(label);
    if (!getLabel) {
      logger.error('Error getting label');
      return false;
    }

    logger.info('Get Labels Successfully');
    return getLabel;
  };

  getLabelByIdService = async (labelId, userId) => {
    const label = await redisServer.getData(labelId);
    if (label) {
      logger.info('Returning from cache for', labelId, label);
      return label;
    }
    const labelFromDB = await userLabelModel.getLabelByIdModel(labelId, userId);
    if (!labelFromDB) {
      logger.error('Error getting label from id');
      return false;
    }

    logger.info('Fetched Label By Id Successfully and setting it to cache', labelId);
    await redisServer.setData(labelId, 120, JSON.stringify(labelFromDB));
    return labelFromDB;
  };

  updateLabelByIdService = (labelId) => new Promise((resolve, reject) => {
    const updatedLable = userLabelModel.updateLabelByIdModel(labelId);
    updatedLable.then((label) => {
      logger.info('Label Updated Successfully');
      redisServer.clearCache(labelId.id).then(resolve(label));
    }).catch((error) => {
      logger.error('Error Updating Label');
      reject(error);
    });
  });

  deleteLabelByIdService = (labelId, callback) => {
    userLabelModel.deleteLabelByIdModel(labelId, (err, data) => {
      if (err) {
        logger.error('Error deleting label');
        return callback(err, null);
      }

      logger.info('Successfully deleted label and cleared cache.');
      redisServer.clearCache(labelId.id);
      return callback(null, data);
    });
  };
}

module.exports = new UserService();
