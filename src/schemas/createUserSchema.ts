import Joi from "joi";

export const createUserSchema = Joi.object({
  companyId: Joi.string().required(),
  fullName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d{1,3}\s?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/)

    .required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
