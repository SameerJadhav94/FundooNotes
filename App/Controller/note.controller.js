/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const validation = require('../utilities/validation');
const userService = require('../service/service');
const { logger } = require('../../logger/logger');

class NoteController {
  createNote = (req, res) => {
    try {
      const note = {
        userId: req.user.tokenData.id,
        title: req.body.title,
        description: req.body.description,
      };
      const noteValidator = validation.createNoteValidation.validate(note);
      if (noteValidator.error) {
        logger.error(noteValidator.error);
        return res.status(400).send({
          message: 'Wrong input validation',
          success: false,
          data: noteValidator,
        });
      }
      const create = userService.createNote(note);
      create.then((data) => {
        logger.info('Note Created Successfully');
        return res.status(201).send({
          success: true,
          message: 'Note Created Successfully',
          data,
        });
      }).catch((error) => {
        logger.error('Please Give Input Properly');
        return res.status(400).send({
          success: false,
          message: 'Please Give Input Properly',
          data: error,
        });
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  getNote = (req, res) => {
    try {
      const id = {
        id: req.user.tokenData.id,
      };

      const getNoteValidation = validation.getNoteValidation.validate(id);
      if (getNoteValidation.error) {
        logger.error(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Validation error',
        });
      }

      const get = userService.getNote(id);
      get.then((data) => {
        logger.info('Here is your note');
        return res.status(200).send({
          success: true,
          message: 'Here is your note',
          data,
        });
      }).catch((error) => {
        logger.error('Could not find note');
        return res.status(400).send({
          success: false,
          message: 'Could not find note',
          data: error,
        });
      });
    } catch (error) {
      logger.error('Internal Server Error');
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  getNoteById = async (req, res) => {
    try {
      const requestData = {
        userId: req.user.tokenData.id,
        noteId: req.params.id,
      };
      const getNoteByIdValidation = validation.getNoteByIdValidation.validate(requestData);
      if (getNoteByIdValidation.error) {
        logger.error(getNoteByIdValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong input validation',
        });
      }
      const getNoteById = await userService.getNoteByID(requestData.noteId, requestData.userId);
        if (!getNoteById) {
          logger.error('Could not find note');
          return res.status(400).send({
            success: false,
            message: 'Could not find note',
          });
        }

        logger.info('Here are your notes matching your request');
        return res.status(200).send({
          success: true,
          message: 'Here are your notes matching your request',
          data: getNoteById,
        });
      
    } catch (error) {
      logger.error('Internal Server Error');
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  updateNoteById = (req, res) => {
    try {
      const update = {
        id: req.params.id,
        userId: req.user.tokenData.id,
        title: req.body.title,
        description: req.body.description,
      };
      const updateNoteValidation = validation.updateNoteByIdValidation.validate(update);
      if (updateNoteValidation.error) {
        logger.error(updateNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong input validation',
        });
      }
      userService.updateNote(update, (error, data) => {
        if (error) {
          logger.error('Enter Properly');
          return res.status(400).send({
            success: false,
            message: 'Enter Properly',
          });
        }
        logger.info('Note Updated Successfully');
        return res.status(200).send({
          success: true,
          message: 'Note Updated Successfully',
          data,
        });
      });
    } catch (error) {
      logger.error('Internal Server Error');
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  deleteNoteById = async (req, res) => {
    try {
      const id = {
        userId: req.user.tokenData.id,
        noteId: req.params.id,
      };
      const deleteNoteByIdValidation = validation.deleteNoteById.validate(id);
      if (deleteNoteByIdValidation.error) {
        logger.error(deleteNoteByIdValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong input validation.',
        });
      }

      const deleteNote = await userService.deleteNote(id);
      if (!deleteNote) {
        logger.error('Note Does Not Get Deleted.');
        return res.status(400).send({
          success: false,
          message: 'Note Does Not Get Deleted.',
        });
      }

      logger.info('Note Deleted Successfully.');
      return res.status(200).send({
        success: true,
        message: 'Note Deleted Successfully.',
      });
    } catch (error) {
      logger.error('Internal Server Error');
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
}

module.exports = new NoteController();
