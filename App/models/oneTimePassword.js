const mongoose = require('mongoose');
const otpSchema = mongoose.Schema({
    email: String,
    code: String,
    expireIn: Number
},{
    timestamp: true
})

const otp = mongoose.model('otp', otpSchema);
module.exports = otp;