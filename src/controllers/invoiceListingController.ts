import { Request, Response } from "express";
import userModel from "@/models/userModel";
import mongoose from "mongoose";

export const invoiceListing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const userId = new mongoose.Types.ObjectId(id);

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const skip = (pageNum - 1) * limitNum;

    const list = await userModel
      .find({ _id: userId })
      .skip(skip)
      .limit(limitNum);
    const totalItems = await userModel.countDocuments({ _id: userId });

    return res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      currentPage: pageNum,
      data: list,
    });
  } catch (error) {
    console.error("Error while getting invoice listing:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
