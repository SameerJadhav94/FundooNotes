/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const note = require('./note.model').NoteDataBase;
const { logger } = require('../../logger/logger');

const labelSchema = mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note',
  }],
  noteId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FundooNote',
  }],
  label: {
    type: String,
    required: true,
    minLength: 2,
  },
}, {
  timestamps: true,
});

const labelDir = mongoose.model('Label', labelSchema);

class LabelModel {
  addLabelModel = async (addLabel) => {
    const labels = new labelDir();
    labels.userId = [addLabel.userId],
    labels.noteId = [addLabel.noteId],
    labels.label = addLabel.label;

    const noteExist = await note.findById({ _id: addLabel.noteId });
    if (!noteExist) {
      logger.error('Note Not Exist');
      return false;
    }

    const labelExist = await labelDir.findOneAndUpdate({ label: addLabel.label }, { $addToSet: { noteId: addLabel.noteId } });
    if (!labelExist) {
      const saveLabel = await labels.save();
      if (!saveLabel) {
        logger.error('Could not save label');
        return false;
      }

      logger.info('Label Saved');
      return saveLabel;
    }

    logger.error('Label Already Exist');
    return false;
  };

  getLabelModel = async (getLabel) => {
    const label = await labelDir.find({ userId: getLabel.id });
    if (!label) {
      logger.error('Label Not Exist');
      return false;
    }

    logger.info('Fetched Label Successfully');
    return label;
  };

  getLabelByIdModel = async (labelId, userId) => {
    const label = await labelDir.findOne({ userId, _id: labelId });
    if (!label) {
      logger.error('Label Not Exist');
      return false;
    }

    logger.info('Fetched Label Successfully');
    return label;
  };

  updateLabelByIdModel = (id) => new Promise((resolve, reject) => {
    labelDir.findByIdAndUpdate(id.id, { label: id.label }, { new: true }).then((data) => {
      logger.info('Success');
      resolve(data);
    }).catch((error) => {
      logger.error('Error');
      reject(error);
    });
  });

  deleteLabelByIdModel = (labelId, callback) => {
    labelDir.findOneAndDelete({ $and: [{ _id: labelId.id }, { userId: labelId.userId }] }, (error, data) => {
      if (error) {
        logger.error('Error deleting label from model');
        return callback(error, null);
      }

      logger.info('label deleted from database');
      return callback(null, data);
    });
  };
}
module.exports = new LabelModel();
