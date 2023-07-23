const Joi = require('joi')

const updateAccountJoiSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50),
    lastName: Joi.string().trim().min(2).max(50),
    email: Joi.string().trim().email().lowercase(),
    password: Joi.string().min(8).max(100),
    confirmPassword: Joi.string().min(8).max(100),
    carType: Joi.string().valid('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER'),
    zipCode: Joi.string().trim().allow(''),
    city: Joi.string().trim().max(100),
    country: Joi.string().trim().max(100),
})

module.exports = updateAccountJoiSchema
