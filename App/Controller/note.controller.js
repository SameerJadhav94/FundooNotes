const validation = require('../utilities/validation');
class NoteController{
    createNote = (req, res) => {
        try{
            const  note = {
                id: req.user._id,
                title: req.body.title,
                description: req.body.description
            }
            const noteValidator = validation.createNoteValidation.validate(note);
            if(noteValidator.error){
                return res.status(400).send({
                    message:"Wrong input validation",
                    success: false,
                    data: noteValidator
                })
            }
            if (note) {
                return res.status(201).send({
                    success: true,
                    message: "Token verified successfully"
                });
            }else{
                return res.status(400).send({
                    success: false,
                    message: "Wrong Input"
                });
            }  
        }catch(error) {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
        
    }
}

module.exports = new NoteController();