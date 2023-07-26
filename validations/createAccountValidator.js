const Joi = require('joi')

const createAccountJoiSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
    carType: Joi.string()
        .valid('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER')
        .required(),
    zipCode: Joi.string().trim().allow('').required(),
    city: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
}).options({ abortEarly: false })

module.exports = createAccountJoiSchema
