const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(12);

class helperClass {
    hashedPassword = (password) => {
        return bcrypt.hashSync(password, salt);
    }
    comparePassword = (password, result) => {
        return bcrypt.compareSync(password, result);
    }
}
module.exports = new helperClass(); 