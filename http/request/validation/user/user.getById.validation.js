const joi = require('joi');
const httpCodes = require('../../../../constants/http');

const validation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().uuid(),
    }).required();
    const validationResult = schema.validate(req.params);
    if (validationResult.error) {
        return res.status(httpCodes.BAD_REQUEST_HTTP_CODE)
            .send({ error: validationResult.error.details[0].message });
    }
    next();
}

module.exports = validation;