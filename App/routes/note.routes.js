const controller = require('../Controller/controller.js');
const noteController = require('../Controller/note.controller.js')
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
  app.post('/createNote', noteController.createNote);
} 