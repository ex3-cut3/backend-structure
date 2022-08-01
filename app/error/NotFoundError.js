const HttpError = require('./HttpError');
const httpCodes = require('../../constants/http');

class NotFoundError extends HttpError {
    statusCode = httpCodes.NOT_FOUND_HTTP_CODE;
}

module.exports = NotFoundError;