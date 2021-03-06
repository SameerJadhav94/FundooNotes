const controller = require('../Controller/controller');
const noteController = require('../Controller/note.controller');
const labelController = require('../Controller/label.controller');
const helper = require('../utilities/encryption');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forgot password
  app.post('/forgotPassword', controller.forgotPassword);
  // api for reset password
  app.patch('/resetPassword', controller.resetPassword);

  // api for Create Note
  app.post('/note', helper.validateToken, noteController.createNote);
  // api for Get Note
  app.get('/note', helper.validateToken, noteController.getNote);
  // api for Get Note By Id
  app.get('/note/:id', helper.validateToken, noteController.getNoteById);
  // api for Update Note By Id
  app.put('/note/:id', helper.validateToken, noteController.updateNoteById);
  // api for Delete Note By Id
  app.delete('/note/:id', helper.validateToken, noteController.deleteNoteById);

  // api for add label
  app.post('/label/:id', helper.validateToken, labelController.addLabel);
  // api for get label
  app.get('/label', helper.validateToken, labelController.getLabel);
  // api for get label
  app.get('/label/:id', helper.validateToken, labelController.getLabelById);
  // api for Update Label By Id
  app.put('/label/:id', helper.validateToken, labelController.updateLabelById);
  // api for Delete Label By Id
  app.delete('/label/:id', helper.validateToken, labelController.deleteLabelById);

  // Verify User
  app.get('/verify/:token', controller.verifyUser);
};
