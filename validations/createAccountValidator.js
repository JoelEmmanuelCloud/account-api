const Joi = require('joi')

const createAccountJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .required()
        .messages({
            'string.base': 'First name should be a string.',
            'string.empty': 'First name cannot be empty.',
            'string.min':
                'First name should be at least {#limit} characters long.',
            'string.max':
                'First name cannot be longer than {#limit} characters.',
            'string.regex':
                'First name should contain only letters, spaces, hyphens, and apostrophes.',
            'any.required': 'First name is required.',
        }),
    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .required()
        .messages({
            'string.base': 'Last name should be a string.',
            'string.empty': 'Last name cannot be empty.',
            'string.min':
                'Last name should be at least {#limit} characters long.',
            'string.max':
                'Last name cannot be longer than {#limit} characters.',
            'string.regex':
                'Last name should contain only letters, spaces, hyphens, and apostrophes.',
            'any.required': 'Last name is required.',
        }),
    email: Joi.string().trim().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email address cannot be empty.',
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email address is required.',
    }),
    password: Joi.string().min(8).trim().required().messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should be at least {#limit} characters long.',
        'any.required': 'Password is required.',
    }),
    confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password.',
        'any.required': 'Confirm password is required.',
    }),
    carType: Joi.string()
        .trim()
        .valid('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER')
        .required()
        .messages({
            'string.base': 'Car type should be a string.',
            'string.empty': 'Car type cannot be empty.',
            'any.only': 'Invalid car type.',
            'any.required': 'Car type is required.',
        }),
    zipCode: Joi.string().allow('').required().messages({
        'string.base': 'Zip code should be a string.',
        'string.empty': 'Zip code cannot be empty.',
        'any.required': 'Zip code is required.',
    }),
    city: Joi.string()
        .trim()
        .regex(/^[a-zA-Z\s'-]+$/i)
        .required()
        .messages({
            'string.base': 'City should be a string.',
            'string.empty': 'City cannot be empty.',
            'string.regex':
                'City should contain only letters, spaces, hyphens, and apostrophes.',
            'any.required': 'City is required.',
        }),
    country: Joi.string()
        .regex(/^[a-zA-Z\s'-]+$/i)
        .trim()
        .required()
        .messages({
            'string.base': 'Country should be a string.',
            'string.empty': 'Country cannot be empty.',
            'string.regex':
                'Country should contain only letters, spaces, hyphens, and apostrophes.',
            'any.required': 'Country is required.',
        }),
}).options({ abortEarly: false })

module.exports = createAccountJoiSchema
