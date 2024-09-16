import Joi from 'joi';

export const  userValidation = Joi.object({
    fullName: Joi.string().min(5).max(15),
    password: Joi.string().min(4).max(10),
    email: Joi.string().email(),
    otp: Joi.number().integer(),
    phoneNumber: Joi.string().min(10).max(12).pattern(/^[0-9]+$/)
});


