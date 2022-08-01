const HttpError = require('./HttpError');
const httpCodes = require('../../constants/http');
const errorTexts = require('../../constants/error');

module.exports = (err, req, res, next) => {
    if (!err) {
        next();
    }
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }
    return res.status(httpCodes.INTERNAL_ERROR_HTTP_CODE).json({
        error: errorTexts.INTERNAL_ERROR
    });
}