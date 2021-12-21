const bcrypt = require('bcrypt');

class helperClass {
    comparePassword = (password, result) => {
        return bcrypt.compareSync(password, result);
    }
}
module.exports = new helperClass(); 