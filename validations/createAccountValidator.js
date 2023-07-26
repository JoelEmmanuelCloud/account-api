const Joi = require('joi')

const createAccountJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-z]+$/)
        .required()
        .messages({
            'string.min':
                'First name should be at least {#limit} characters long.',
            'string.max':
                'First name cannot be longer than {#limit} characters.',
            'string.regex': 'First name should contain only lowercase letters.',
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-z]+$/)
        .required()
        .messages({
            'string.min':
                'Last name should be at least {#limit} characters long.',
            'string.max':
                'Last name cannot be longer than {#limit} characters.',
            'string.regex': 'Last name should contain only lowercase letters.',
            'any.required': 'Last name is required.',
        }),
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string()
        .min(8)
        .regex(/^[a-z0-9!@#$%^&*()\-_=+{};:'",.<>/?\\|[\]~`]+$/)
        .required()
        .messages({
            'string.min':
                'Password should be at least {#limit} characters long.',
            'string.regex':
                'Password should contain lowercase letters, numbers, and special characters.',
            'any.required': 'Password is required.',
        }),
    confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password.',
        'any.required': 'Confirm password is required.',
    }),
    carType: Joi.string().required().messages({
        'any.required': 'Car type is required.',
    }),
    zipCode: Joi.string().trim().allow('').required().messages({
        'string.empty': 'Zip code cannot be empty.',
        'any.required': 'Zip code is required.',
    }),
    city: Joi.string()
        .trim()
        .regex(/^[a-z]+$/)
        .required()
        .messages({
            'string.pattern.base':
                'City should contain only lowercase letters.',
            'string.empty': 'City cannot be empty.',
            'any.required': 'City is required.',
        }),
    country: Joi.string()
        .trim()
        .regex(/^[a-z]+$/)
        .required()
        .messages({
            'string.pattern.base':
                'Country should contain only lowercase letters.',
            'string.empty': 'Country cannot be empty.',
            'any.required': 'Country is required.',
        }),
}).options({ abortEarly: false })

module.exports = createAccountJoiSchema
