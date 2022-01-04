const mongoose = require('mongoose');
const note = require('./note.model').NoteDataBase
const { logger } = require('../../logger/logger');

const labelSchema = mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note'
    }],
    noteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundooNote'
    }],
    label: {
        type: String,
        required: true,
        minLength: 2,
    }
}, {
    timestamps: true,
});

const labelDir = mongoose.model('Label', labelSchema);

class LabelModel {
    addLabelModel = async (addLabel) => {
        const labels = new labelDir()
            labels.userId = addLabel.userId,
            labels.noteId = addLabel.noteId,
            labels.label =  addLabel.label
        
        const noteExist = await note.findById({_id: addLabel.noteId});
        if (!noteExist) {
            logger.error('Note Not Exist')
            return false;
        }    
        else{
            const labelExist = await labelDir.findOneAndUpdate({label: addLabel.label}, {$addToSet: {noteId: addLabel.noteId}});
            if (!labelExist) {
                const saveLabel = await labels.save();
                if (!saveLabel) {
                    logger.error('Could not save label')
                    return false;
                }
                else{
                    logger.info('Label Saved')
                    return saveLabel;
                }
            }
            else{
                logger.error('Label Already Exist')
                return false;
            }
        }
    }
    getLabelModel = async (getLabel) => {
        const label = await labelDir.find({userId: getLabel.id});
        if (!label){
            logger.error('Label Not Exist')
            return false;
        }
        else{
            logger.info('Fetched Label Successfully')
            return label;
        }
    }

    getLabelByIdModel = async (labelId) => {
        const label = await labelDir.find({userId: labelId.userId, _id: labelId.id});
        if (!label) {
            logger.error('Label Not Exist')
            return false;
        }
        else{
            logger.info('Fetched Label Successfully')
            return label;
        }
    }
}
module.exports = new LabelModel();