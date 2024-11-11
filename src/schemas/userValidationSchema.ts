import Joi from "joi";

export const userValidation = Joi.object({
  fullName: Joi.string().min(5).max(15),
  password: Joi.string().min(4).max(10),
  email: Joi.string().email(),
  otp: Joi.number().integer(),
  phoneNumber: Joi.string().min(10).max(10),
  companyId: Joi.string(),
  plan: Joi.string(),
  amount: Joi.number(),
  discount: Joi.number(),
  total: Joi.number(),
});
