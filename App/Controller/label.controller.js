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
                label: req.body.label
            }
            const validateLabel = validation.labelValidation.validate(label);
            if (validateLabel.error) {
                logger.error(validateLabel.error)
                return res.status(400).send({
                    success: false,
                    message: 'Wrong label validation'
                })
            }
            const success = await userService.addLabel(label)
            if (!success) {
                logger.error('Label Already Exists')
                return res.status(400).send({
                    success: false,
                    message: 'Label Already Exists'
                })
            }
            else {
                logger.info('Label added successfully')
                return res.status(200).send({
                    success: true,
                    message: 'Label added successfully',
                });
            }
        } catch (error) {
            logger.error('Internal server error')
            return res.status(500).send({
                success: false,
                message: 'Internal server error',
            })
        };
    };

    getLabel = async (req, res) => {
        try {
            const id = { id: req.user.tokenData.id };

            const getLabelValidator = validation.getLabelValidation.validate(id);
            if (getLabelValidator.error) {
                logger.error(getLabelValidator.error)
                return res.status(400).send({
                    success: false,
                    message: 'Wrong Input Validation'
                })
            }
            const getLabel = await userService.getLabelService(id);
            if (!getLabel) {
                logger.error('Could Not Fetch Labels')
                return res.status(400).send({
                    success: false,
                    message: 'Could Not Fetch Labels.'
                })
            }
            else {
                logger.info('Here are your labels')
                return res.status(200).send({
                    success: true,
                    message: "Here are your labels...",
                    data: getLabel
                })
            }
        } catch {
            logger.error('Internal server error')
            return res.status(500).send({
                success: false,
                message: 'Internal server error',
            })
        }

    }
    getLabelById = async (req, res) => {
        try {
            const id = { 
                userId: req.user.tokenData.id,
                labelId: req.params.id
            }

            const getLabelByIdValidator = validation.getLabelByIdValidation.validate(id);
            if (getLabelByIdValidator.error) {
                return res.status(400).send({
                    success: false,
                    message: 'Wrong Input Validation'
                })
            }
            return res.status(200).send({
                success: true,
                message: 'Your Label...'
            })
        }catch{
            logger.error('Internal server error')
            return res.status(500).send({
                success: false,
                message: 'Internal server error',
            })
        }
        
    }
}

module.exports = new LabelController();