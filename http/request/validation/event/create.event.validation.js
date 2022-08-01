const joi = require("joi");
const httpCodes = require("../../../../constants/http");
const first = require('../../../../helpers/array').first;

const validation = (req, res, next) => {
    const schema = joi.object({
        // id: joi.string().uuid(),
        type: joi.string().required(),
        homeTeam: joi.string().required(),
        awayTeam: joi.string().required(),
        startAt: joi.date().required(),
        odds: joi.object({
            homeWin: joi.number().min(1.01).required(),
            awayWin: joi.number().min(1.01).required(),
            draw: joi.number().min(1.01).required(),
        }).required(),
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