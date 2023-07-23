const Joi = require('joi');

const createAccountJoiSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.string().min(8).max(100).required(),
    carType: Joi.string().valid('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER').required(),
    zipCode: Joi.string().trim().allow('').required(),
    city: Joi.string().trim().max(100).required(),
    country: Joi.string().trim().max(100).required(),
});

module.exports = createAccountJoiSchema;
