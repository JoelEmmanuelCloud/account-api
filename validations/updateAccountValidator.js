const Joi = require('joi')

const updateAccountJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .messages({
            'string.empty': 'First name cannot be empty.',
            'string.min':
                'First name should be at least {#limit} characters long.',
            'string.max':
                'First name cannot be longer than {#limit} characters.',
            'string.regex':
                'First name should contain only letters, spaces, hyphens, and apostrophes.',
            
        }),
    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .messages({
            'string.empty': 'Last name cannot be empty.',
            'string.min':
                'Last name should be at least {#limit} characters long.',
            'string.max':
                'Last name cannot be longer than {#limit} characters.',
            'string.regex':
                'Last name should contain only letters, spaces, hyphens, and apostrophes.',
            
        }),
    email: Joi.string().trim().email().messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email address cannot be empty.',
        'string.email': 'Please provide a valid email address.',
    }),
    password: Joi.string().min(8).max(100).trim().messages({
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should be at least {#limit} characters long.',
        'string.max': 'Password cannot be longer than {#limit} characters.',
        
    }),
    confirmPassword: Joi.valid(Joi.ref('password')).messages({
        'any.only': 'Confirm password must match the password.',
    }),
    carType: Joi.string()
        .trim()
        .valid('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'OTHER')
        .messages({
            'string.base': 'Car type should be a string.',
            'string.empty': 'Car type cannot be empty.',
            'any.only': 'Invalid car type.',
            
        }),
    zipCode: Joi.string().allow('').messages({
        'string.base': 'Zip code should be a string.',
        'string.empty': 'Zip code cannot be empty.',
    }),
    city: Joi.string()
        .trim()
        .max(100)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .messages({
            'string.base': 'City should be a string.',
            'string.empty': 'City cannot be empty.',
            'string.regex':
                'City should contain only letters, spaces, hyphens, and apostrophes.',
            
        }),
    country: Joi.string()
        .trim()
        .max(100)
        .regex(/^[a-zA-Z\s'-]+$/i)
        .messages({
            'string.empty': 'Country cannot be empty.',
            'string.max': 'Country cannot be longer than {#limit} characters.',
            'string.regex':
                'Country should contain only letters, spaces, hyphens, and apostrophes.',
            
        }),
}).options({ abortEarly: false })

module.exports = updateAccountJoiSchema
