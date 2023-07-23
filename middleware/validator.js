const createHttpError = require('http-errors')
const Joi = require('joi')
const Validators = require('../validations')

const validateRequest = function (validatorName) {
    if (!Validators.hasOwnProperty(validatorName))
        throw new Error(`'${validatorName}' validator is not exist`)

    return async function (req, res, next) {
        try {
            const validated = await Validators[validatorName].validateAsync(
                req.body
            )
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi)
                return next(createHttpError(422, { message: err.message }))
            next(createHttpError(500))
        }
    }
}

module.exports = validateRequest
