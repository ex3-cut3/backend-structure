const NotFoundError = require('./NotFoundError');
const errorTexts = require('../../constants/error');

class UserNotFound extends NotFoundError {
    constructor(props = errorTexts.USER_NOT_FOUND) {
        super(props);
        this.message = props;
    }
}

module.exports = UserNotFound;