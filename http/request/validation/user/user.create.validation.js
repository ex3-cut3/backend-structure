const joi = require('joi');
const httpCodes = require('../../../../constants/http');
const phoneMask = require('../mask').phone;
const array = require('../../../../helpers/array');

const validation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(phoneMask).required(),
        name: joi.string().required(),
        city: joi.string(),
        balance: joi.number()
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