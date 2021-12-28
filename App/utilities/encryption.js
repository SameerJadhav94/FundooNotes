const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {logger} = require('../../logger/logger')

class helperClass {
    comparePassword = (password, result) => {
        return bcrypt.compareSync(password, result);
    }

    validateToken = (req, res, next) => {
        const header = req.headers.authorization;
        const myArray = header.split(" ");
        const token = myArray[1];
        try {
            if (token) {
                jwt.verify(token, process.env.SECRET_KEY, (error, decrypt) =>{
                    if (error) {
                        return res.status(400).send(
                            {message: "Send Correct Token",
                             success: false
                            })
                    }else {
                        req.user = decrypt;
                        next();
                    }
                })
            }else {
                return res.status(401).send({success: false, message: "Attention!!! Cannot Verify User"});
            }
        }catch (error) {
            return res.status(500).send({success: false, message: "Something went wrong!"})
        }
    }
}
module.exports = new helperClass(); 