const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const otp = require('./oneTimePassword')
const salt = bcrypt.genSaltSync(12);

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next();
})

const user = mongoose.model('note', userSchema);

class userModel {

    registerUser = (userDetails, callback) => {
        const newUser = new user();
        newUser.firstName = userDetails.firstName;
        newUser.lastName = userDetails.lastName;
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;

        newUser.save()
            .then(data => {
                callback(null, data);
            })
            .catch(err => {
                callback({ message: "Error while Storing User Details in DataBase" }, null);
            })
    };

    loginModel = (loginData, callBack) => {
        //To find a user email in the database
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credential", null);
            } else {
                return callBack(null, data);
            }
        });
    }
    forgotPasswordModel = (emailCheckModel, callBack) => {
        //To find a user email in the database
        user.findOne({email: emailCheckModel.email}, (error, data)=>{
            if (error) {
                return callBack(error, null)
            }else if(!data){
                return callBack("Enter valid email", null)
            }else{
                return callBack(null, data)
            }
        })
    }
    resetPasswordModel = (PasswordModel, callBack) => {
        //To find code in the database
        otp.findOne({code: PasswordModel.code}, (error, data) => {
            if(data){
                if(PasswordModel.code == data.code){
                    PasswordModel.password = bcrypt.hashSync(PasswordModel.password, salt)
                    //To update password in the database
                    user.updateOne({email: PasswordModel.email}, {$set: {password: PasswordModel.password}},(error, result)=>{
                        if(result){
                            return callBack(error,"Password Updated Successfully")
                        }
                        else{
                            return callBack("Error while updating password",null)
                        }
                    })
                }else{
                    return callBack("User Not Found",null)
                }
            }else{
                return callBack("Credential does not match",null)
            }
        })
    }

    
}
module.exports = {UserModel: new userModel(), userDB: user}