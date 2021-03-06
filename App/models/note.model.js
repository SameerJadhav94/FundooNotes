/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const model = require('./model').userDB;
const { logger } = require('../../logger/logger');

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note',
  },
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
  },
}, {
  timestamps: true,
});

const Note = mongoose.model('FundooNote', noteSchema);

class NoteModel {
  // eslint-disable-next-line class-methods-use-this
  createNoteModel = (noteModel) => new Promise((resolve, reject) => {
    const fundooNote = new Note();
    // eslint-disable-next-line no-sequences
    fundooNote.userId = noteModel.userId,
    fundooNote.title = noteModel.title,
    fundooNote.description = noteModel.description;
    model.findById({ _id: noteModel.userId })
      .then((data) => {
        resolve(fundooNote.save(data));
      }).catch((error) => {
        reject(error);
      });
  });

  // eslint-disable-next-line class-methods-use-this
  getNoteModel = (getNote) => new Promise((resolve, reject) => {
    Note.find({ userId: getNote.id }).sort({ updatedAt: -1 })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getNoteByIDModel = async (noteId, userId) => {
    const note = await Note.findOne({ userId, _id: noteId });
    if (!note) {
      logger.error('Note Does Not Exist');
      return false;
    }
    logger.info('Note Fetched SuccessFully.');
    return note;
  };

  updateNoteModel = (updateNote, callBack) => {
    Note.findByIdAndUpdate(updateNote.id, { title: updateNote.title, description: updateNote.description }, { new: true }, (err, data) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, data);
    });
  };

  // eslint-disable-next-line class-methods-use-this
  deleteNoteModel = async (deleteNote) => {
    const delNote = await Note.findOneAndDelete({ $and: [{ userId: deleteNote.userId, _id: deleteNote.noteId }] });
    if (!delNote) {
      return false;
    }
    return delNote;
  };
}

module.exports = { NoteModel: new NoteModel(), NoteDataBase: Note };
