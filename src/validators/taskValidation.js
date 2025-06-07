import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': 'Task title must be a string',
        'any.required': 'Task title is required',
    }),

// This means: description is optional, and if present, it can be empty string, null, or a valid string.
    description: Joi.string().optional().allow('', null),

    status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
        'any.only': 'Status must be one of: pending, in-progress, completed',
    }),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).optional(),

    description: Joi.string().optional(),
    
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
        'any.only': 'Status must be one of: pending, in-progress, completed',
    }),
});