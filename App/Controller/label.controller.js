/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const validation = require('../utilities/validation');
const userService = require('../service/service');
const { logger } = require('../../logger/logger');

class LabelController {
  // eslint-disable-next-line class-methods-use-this
  addLabel = async (req, res) => {
    try {
      const label = {
        userId: req.user.tokenData.id,
        noteId: req.params.id,
        label: req.body.label,
      };
      const validateLabel = validation.labelValidation.validate(label);
      if (validateLabel.error) {
        logger.error(validateLabel.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong label validation',
        });
      }
      const success = await userService.addLabel(label);
      if (!success) {
        logger.error('Label Already Exists');
        return res.status(400).send({
          success: false,
          message: 'Label Already Exists',
        });
      }

      logger.info('Label added successfully');
      return res.status(200).send({
        success: true,
        message: 'Label added successfully',
        data: success,
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  getLabel = async (req, res) => {
    try {
      const id = { id: req.user.tokenData.id };

      const getLabelValidator = validation.getLabelValidation.validate(id);
      if (getLabelValidator.error) {
        logger.error(getLabelValidator.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validation',
        });
      }
      const getLabel = await userService.getLabelService(id);
      if (!getLabel) {
        logger.error('Could Not Fetch Labels');
        return res.status(400).send({
          success: false,
          message: 'Could Not Fetch Labels.',
        });
      }

      logger.info('Here are your labels');
      return res.status(200).send({
        success: true,
        message: 'Here are your labels...',
        data: getLabel,
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  getLabelById = async (req, res) => {
    try {
      const requestData = {
        userId: req.user.tokenData.id,
        id: req.params.id,
      };

      const getLabelByIdValidator = validation.getLabelByIdValidation.validate(requestData);
      if (getLabelByIdValidator.error) {
        logger.error(getLabelByIdValidator.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validation',
        });
      }

      const getLabelById = await userService.getLabelByIdService(requestData.id, requestData.userId);
      if (!getLabelById) {
        logger.error('Could Not Fetch Label');
        return res.status(400).send({
          success: false,
          message: 'Could Not Fetch Label.',
        });
      }

      logger.info('Your Label');
      return res.status(200).send({
        success: true,
        message: 'Your Label...',
        data: getLabelById,
      });
    } catch (error) {
      console.log(error);
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        error,
      });
    }
  };

  updateLabelById = (req, res) => {
    try {
      const id = {
        id: req.params.id,
        userId: req.user.tokenData.id,
        label: req.body.label,

      };
      const updateLabelValidator = validation.updateLabelByIdValidations.validate(id);
      if (updateLabelValidator.error) {
        logger.error(updateLabelValidator.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validation',
        });
      }

      const updateLabel = userService.updateLabelByIdService(id);
      updateLabel.then((data) => {
        logger.info('Label Updated Successfully');
        return res.status(200).send({
          success: true,
          message: 'Label Updated Successfully',
          data,
        });
      }).catch((error) => {
        logger.error('Could Not Update Label');
        return res.status(400).send({
          success: false,
          message: 'Could Not Update Label',
          data: error,
        });
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  deleteLabelById = (req, res) => {
    try {
      const id = {
        id: req.params.id,
        userId: req.user.tokenData.id,
      };

      const deleteLabelByIdValidator = validation.deleteLabelByIdValidations.validate(id);
      if (deleteLabelByIdValidator.error) {
        logger.error(deleteLabelByIdValidator.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validation.',
        });
      }
      userService.deleteLabelByIdService(id, (error, data) => {
        if (error) {
          logger.error('Could Not Delete Label');
          return res.status(400).send({
            success: false,
            message: 'Could Not Delete Label',
            error,
          });
        }

        logger.info('Label Deleted Successfully');
        return res.status(200).send({
          success: true,
          message: 'Label Deleted Successfully',
          data,
        });
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}

module.exports = new LabelController();
