import Joi from "joi";

export const companyRegistrationSchema = Joi.object({
  companyName: Joi.string().required().messages({
    "any.required": "Company name is required",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location is required",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required",
  }),
  zip: Joi.string().required().messages({
    "any.required": "ZIP code is required",
  }),
});

export const validateCompanyRegistration = (req: any, res: any, next: any) => {
  const { error } = companyRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }
  next();
};
