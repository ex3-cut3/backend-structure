const appConfig = require("../config/app");
const jwt = require("jsonwebtoken");
const httpCodes = require("../constants/http");
const errorTexts = require("../constants/error");

module.exports = (req, res, next) => {
    const authHeader = req.headers[appConfig.AUTHORIZATION_HEADER];
    const accessToken = authHeader.replace('Bearer ', '');
    try {
        const tokenPayload = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );
        if (req.params.id !== tokenPayload.id) {
            return res.status(httpCodes.NOT_AUTHORIZED_HTTP_CODE)
                .send({ error: errorTexts.USER_ID_MISMATCH });
        }
        next();
    } catch (err) {
        return res.status(httpCodes.NOT_AUTHORIZED_HTTP_CODE)
            .json({
                error: errorTexts.NOT_AUTHORIZED
            });
    }
}