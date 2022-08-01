const HttpError = require('./HttpError');
const errorTexts = require("../../constants/error");

class UserAlreadyExists extends HttpError {
    constructor(props = errorTexts.USER_ALREADY_EXISTS) {
        super(props);
        this.message = props;
    }
}

module.exports = UserAlreadyExists;