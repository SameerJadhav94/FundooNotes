const validation = require('../utilities/validation');
const userService = require('../service/service.js')
class NoteController{
    createNote = (req, res) => {
        try{
            const  note = {
                userId: req.user.tokenData.id,
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
            userService.createNote(note, (error, data) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: "Please Give Input Properly"
                    });
                }else{  
                    return res.status(201).send({
                        success: true,
                        message: "Note Created Successfully",
                        data: data
                    });
                }
            })
              
        }catch(error) {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
        
    }

    getNote = (req, res) => {
        try {
            const id = {
                id: req.user.tokenData.id
            }
    
            const getNoteValidation = validation.getNoteValidation.validate(id)
            if (getNoteValidation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Validation error"
                })
            }

            userService.getNote(id, (error, data)=>{
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: "Could not find note"
                    })
                }else{
                    return res.status(200).send({
                        success: true,
                        message: "Here is your note",
                        data: data
                    })
                }
            })
            
        }catch(error) {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
        
}

module.exports = new NoteController();