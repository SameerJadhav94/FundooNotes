const validation = require('../utilities/validation');
const userService = require('../service/service.js')
const {logger} = require('../../logger/logger');
const { tr } = require('faker/lib/locales');
const { updateNoteByIdValidation } = require('../utilities/validation');
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
                logger.error(noteValidator.error)
                return res.status(400).send({
                    message:"Wrong input validation",
                    success: false,
                    data: noteValidator
                })
            }
            userService.createNote(note, (error, data) => {
                if (error) {
                    logger.error("Please Give Input Properly")
                    return res.status(400).send({
                        success: false,
                        message: "Please Give Input Properly"
                    });
                }else{  
                    logger.info("Note Created Successfully")
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
                logger.error(getNoteValidation.error)
                return res.status(400).send({
                    success: false,
                    message: "Validation error"
                })
            }

            userService.getNote(id, (error, data)=>{
                if (error) {
                    logger.error("Could not find note")
                    return res.status(400).send({
                        success: false,
                        message: "Could not find note"
                    })
                }else{
                    logger.info("Here is your note")
                    return res.status(200).send({
                        success: true,
                        message: "Here is your note",
                        data: data
                    })
                }
            })
            
        }catch(error) {
            logger.error("Internal Server Error")
            return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    getNoteById = (req, res) => {
        try {
            const id = {
                userId: req.user.tokenData.id,
                noteId: req.params.id
            };
            const getNoteByIdValidation = validation.getNoteByIdValidation.validate(id)
            if (getNoteByIdValidation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong input validation"
                });
            }
            userService.getNoteByID(id, (error, data)=>{
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: "Could not find note"
                    });
                }
                else{
                    return res.status(200).send({
                        success:true, 
                        message:"Here are your notes matching your request",
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

    updateNoteById = (req, res) => {
        try {
            const update = {
                id: req.params.id,
                userId: req.user.tokenData.id,
                title: req.body.title,
                description: req.body.description
            }
            const updateNoteValidation = validation.updateNoteByIdValidation.validate(update);
            if (updateNoteValidation.error) {
                return res.status(400).send({
                    success: false,
                    message: "Wrong input validation"
                })
            }
            userService.updateNote(update, (error, data)=>{
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: "Enter Properly"
                    }) 
                }else{
                    return res.status(200).send({
                        success: true,
                        message: "Note Updated Successfully",
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