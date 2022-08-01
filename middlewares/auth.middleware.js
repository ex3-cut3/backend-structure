const appConfig = require('../config/app');
const httpCodes = require('../constants/http');
const errorTexts = require('../constants/error');
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.headers[appConfig.AUTHORIZATION_HEADER]) {
        return res.status(httpCodes.NOT_AUTHORIZED_HTTP_CODE)
            .json({
                error: errorTexts.NOT_AUTHORIZED
            });
    }
    const authHeader = req.headers[appConfig.AUTHORIZATION_HEADER];
    const accessToken = authHeader.replace('Bearer ', '');
    try {
        jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );
        next();
    } catch (err) {
        return res.status(httpCodes.NOT_AUTHORIZED_HTTP_CODE)
            .json({
                error: errorTexts.NOT_AUTHORIZED
            });
    }
}