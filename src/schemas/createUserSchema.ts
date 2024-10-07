import Joi from "joi";

export const createUserSchema = Joi.object({
  companyId: Joi.string().required(),
  fullName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
