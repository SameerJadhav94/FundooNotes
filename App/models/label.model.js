const mongoose = require('mongoose');
const note = require('./note.model').NoteDataBase
const model = require('./model').userDB;

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note'
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundooNote'
    },
    label:{
        type: String,
        required: true,
        minLength: 2,
    }
},{
    timestamps: true,
});

const labelDir = mongoose.model('Label', labelSchema);

class LabelModel{

}