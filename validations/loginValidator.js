const Joi = require('joi')

const loginJoiSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(100).required(),
})

module.exports = loginJoiSchema
