const mongoose = require('mongoose');
const model =  require('../models/model').userDB
const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "note",
    },
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String,
        required: true,
        minLength: 1
    },
}, {
    timestamps: true,
})

const Note = mongoose.model('FundooNote', noteSchema);

class NoteModel{
    createNoteModel = (noteModel) => {
        return new Promise((resolve, reject) => {
            const fundooNote = new Note();
                fundooNote.userId = noteModel.userId,
                fundooNote.title = noteModel.title,
                fundooNote.description = noteModel.description
            model.findById({_id: noteModel.userId})
            .then((data)=>{
                resolve(fundooNote.save(data))
            }).catch((error) => {
                reject(error)
            })
        })      
    }

    getNoteModel = (getNote) => {
        return new Promise((resolve, reject) => {
            Note.find({userId: getNote.id})
            .then((data)=>{
                resolve(data)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }

    getNoteByIDModel = (getNoteById, callBack) => {
        Note.find({userId: getNoteById.userId, _id: getNoteById.noteId}, (err, data) => {
            if (data) {
                callBack(null, data)
            }else{
                callBack(err, null)
            }
        })
    }

    updateNoteModel = (updateNote, callBack) => {
        Note.findByIdAndUpdate(updateNote.id, {title: updateNote.title, description: updateNote.description},{new:true},(err, data) => {
            if (err) {
                return callBack(err, null);
            }
            else{
                return callBack(null, data)
            }
        })
    }

    deleteNoteModel = async(deleteNote) => {
        const delNote = await Note.findOneAndDelete({$and: [{userId: deleteNote.userId, _id: deleteNote.noteId}]})
        if (!delNote) {
            return false
        }
        else {
            return delNote
        }
    }
}
 
module.exports = {NoteModel: new NoteModel(), NoteDataBase: Note};

