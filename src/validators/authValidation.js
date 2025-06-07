import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.base': 'Username must be a string',
        'string.min': 'Username must be atleast 3 characters long',
        'any.required': 'Username is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be atleast 6 characters long',
        'any.required': 'Password is required',
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});

export const deleteUserSchema = Joi.object({
    password: Joi.string().required().messages({
        'string.empty': 'Password is required to delete your account',
    }),
});