const httpCodes = require('../../constants/http');

class HttpError extends Error {
    statusCode = httpCodes.BAD_REQUEST_HTTP_CODE
    constructor(props) {
        super(props);
    }
}

module.exports = HttpError;