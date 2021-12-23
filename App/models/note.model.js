const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
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

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '12H' })
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        res.status(500).json({ message: 'Cannot generate auth token', err })
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
    forgotPasswordModel = (emailCheckModel, callBack) => {
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
}
module.exports = new userModel();