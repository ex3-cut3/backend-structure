const joi = require("joi");
const httpCodes = require("../../../../constants/http");
const first = require('../../../../helpers/array').first;

const validation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        userId: joi.string().uuid().required(),
        cardNumber: joi.string().required(),
        amount: joi.number().min(0).required(),
    }).required();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(httpCodes.BAD_REQUEST_HTTP_CODE)
            .send({
                error: first(validationResult.error.details)?.message
            });
    }
    next();
}
module.exports = validation;