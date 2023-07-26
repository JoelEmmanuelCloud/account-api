const Joi = require('joi')

const updateAccountJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-z]+$/)
        .messages({
            'string.min':
                'First name should be at least {#limit} characters long.',
            'string.max':
                'First name cannot be longer than {#limit} characters.',
            'string.regex': 'First name should contain only lowercase letters.',
        }),
    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-z]+$/)
        .messages({
            'string.min':
                'Last name should be at least {#limit} characters long.',
            'string.max':
                'Last name cannot be longer than {#limit} characters.',
            'string.regex': 'Last name should contain only lowercase letters.',
        }),
    email: Joi.string().trim().email().lowercase().messages({
        'string.email': 'Please provide a valid email address.',
    }),
    password: Joi.string()
        .min(8)
        .max(100)
        .regex(/^[a-z0-9!@#$%^&*()\-_=+{};:'",.<>/?\\|[\]~`]+$/)
        .messages({
            'string.min':
                'Password should be at least {#limit} characters long.',
            'string.max': 'Password cannot be longer than {#limit} characters.',
            'string.regex':
                'Password should contain lowercase letters, numbers, and special characters.',
            'any.required': 'Password is required.',
        }),
    confirmPassword: Joi.valid(Joi.ref('password')).messages({
        'any.only': 'Confirm password must match the password.',
    }),
    carType: Joi.string().trim(),
    zipCode: Joi.string().trim().allow(''),
    city: Joi.string()
        .trim()
        .max(100)
        .regex(/^[a-z]+$/)
        .messages({
            'string.pattern.base':
                'City should contain only lowercase letters.',
            'string.max': 'City cannot be longer than {#limit} characters.',
        }),
    country: Joi.string()
        .trim()
        .max(100)
        .regex(/^[a-z]+$/)
        .messages({
            'string.pattern.base':
                'Country should contain only lowercase letters.',
            'string.max': 'Country cannot be longer than {#limit} characters.',
        }),
}).options({ abortEarly: false })

module.exports = updateAccountJoiSchema
