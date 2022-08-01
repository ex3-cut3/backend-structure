const joi = require('joi');
const httpCodes = require('../../../../constants/http');
const phoneMask = require('../mask').phone;
const array = require('../../../../helpers/array');

const validation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email(),
        phone: joi.string().pattern(phoneMask),
        name: joi.string(),
        city: joi.string()
    }).required();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(httpCodes.BAD_REQUEST_HTTP_CODE)
            .send({
                error: array.first(
                    validationResult.error.details
                )?.message
            });
    }
    next();
}

module.exports = validation;