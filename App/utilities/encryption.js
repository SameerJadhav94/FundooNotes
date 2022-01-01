const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {logger} = require('../../logger/logger')

class helperClass {
    comparePassword = (password, result) => {
        return bcrypt.compareSync(password, result);
    }

    token = (data) => {
        const tokenData = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          email: data.email
        };
        return jwt.sign({ tokenData }, process.env.SECRET_KEY, { expiresIn: "50H" });
      }


    validateToken = (req, res, next) => {
        const header = req.headers.authorization;
        const myToken = header.split(" ");
        const token = myToken[1];
        try {
            if (token) {
                jwt.verify(token, process.env.SECRET_KEY, (error, decoded) =>{
                    if (error) {
                        return res.status(400).send(
                            {message: "Send Correct Token",
                             success: false
                            })
                    }else {
                        req.user = decoded;
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