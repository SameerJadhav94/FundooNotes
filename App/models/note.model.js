const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        const fundooNote = new Note();
        fundooNote.id = noteModel.id,
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
}
 
module.exports = new NoteModel();

