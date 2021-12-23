const userModel = require('../models/note.model.js')
const encryption = require('../utilities/encryption')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    userLogin = (InfoLogin, callback) => {
        userModel.loginModel(InfoLogin, (error, data) => {
          if (data) {
            const passwordResult = encryption.comparePassword(InfoLogin.password, data.password);
            if(!passwordResult) {
              
              return callback("Error ocurred", null);
            }
            else{
              const token = data.generateAuthToken();
              return callback(null,token);
            }
            
          } else {
            return callback(error, null);
          }
        });
      } 
}
module.exports = new userService();