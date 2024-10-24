import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // AbortEarly to get all errors, not just the first

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", "); // Combine all error messages
      return res.status(400).json({ error: errorMessage }); // Return the actual error message(s)
    }
    next();
  };
};
