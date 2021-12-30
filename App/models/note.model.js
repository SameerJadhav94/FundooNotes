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
    createNoteModel = (noteModel, callBack) => {
        model.findById({_id: noteModel.userId}, (error, data)=>{
            if (error) {
                return callBack(error, null);
            }
            else if (!data){
                return callBack("Could not find id", null)
            }
            else{
                const fundooNote = new Note();
                fundooNote.userId = noteModel.userId,
                fundooNote.title = noteModel.title,
                fundooNote.description = noteModel.description

                fundooNote.save((err, data) =>{
                    if(err){
                        return callBack(err, null)
                    }
                    else{
                        return callBack(null, data)
                    }
                })
            }
        })       
    }

    getNoteModel = (getNote, callBack) => {
        Note.find({userId: getNote.id}, (err, data) => {
            if (data) {
                callBack(null, data)
            }
            else if (!data){
                callBack("Entered Id is Wrong", null)
            }
            else {
                callBack(err, null)
            }
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
}
 
module.exports = {NoteModel: new NoteModel(), NoteDataBase: Note};

