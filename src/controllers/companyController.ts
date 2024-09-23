import { Request, Response } from "express";
import Company from "../models/companyModel";

export const registerCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { companyName, location, city, state, zip } = req.body;

  try {
    const newCompany = new Company({
      companyName,
      location,
      city,
      state,
      zip,
    });

    const savedCompany = await newCompany.save();
    res
      .status(201)
      .json({
        message: "Company registered successfully",
        company: savedCompany,
      });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
