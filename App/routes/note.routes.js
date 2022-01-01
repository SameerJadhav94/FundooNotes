const controller = require('../Controller/controller.js');
const noteController = require('../Controller/note.controller.js')
const helper = require('../utilities/encryption')

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  //api for forgot password
  app.post('/forgotPassword', controller.forgotPassword);
  //api for reset password
  app.patch('/resetPassword', controller.resetPassword);

  //api for Create Note
  app.post('/createNote',helper.validateToken ,noteController.createNote);
  //api for Get Note
  app.get('/getNote', helper.validateToken ,noteController.getNote);
  //api for Get Note By Id
  app.get('/getNoteById/:id', helper.validateToken,noteController.getNoteById);
  //api for Update Note By Id
  app.put('/updateNoteById/:id', helper.validateToken,noteController.updateNoteById);
  //api for Delete Note By Id
  app.delete('/deleteNoteById/:id', helper.validateToken,noteController.deleteNoteById);
} 