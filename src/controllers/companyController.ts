import Company from "@/models/companyModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const userId = new mongoose.Types.ObjectId(id);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const { companyName, location, city, state, zip } = req.body;

    if (!companyName || !location || !city || !state || !zip) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCompany = new Company({
      companyName,
      location,
      city,
      state,
      zip,
      userId,
    });

    await newCompany.save();

    return res
      .status(201)
      .json({ msg: "Company registered successfully", company: newCompany });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
