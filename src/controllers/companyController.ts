import { Request, Response } from "express";
import Company from "../models/companyModel";
import mongoose from "mongoose";

export const registerCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { companyName, location, city, state, zip } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const newCompany = new Company({
      companyName,
      location,
      city,
      state,
      zip,
      userId: id,
    });

    const savedCompany = await newCompany.save();

    return res.status(201).json({
      message: "Company registered successfully",
      company: savedCompany,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Company registration failed",
      details: (error as Error).message,
    });
  }
};
