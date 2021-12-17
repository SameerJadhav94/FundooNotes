const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

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
    tokens:[{
      token: {
        type: String,
        required: true
      }  
    }]
},
    {
        timestamps: true
    })

    userSchema.methods.generateAuthToken = async function(){
        try {
            let token =  jwt.sign({_id:this._id}, process.env.SECRET_KEY)
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
        }catch(err){
            res.status(500).json({message:'Cannot generate auth token', err})
        }
    }

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
}
module.exports = new userModel();