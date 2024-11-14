import { Request, Response } from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import invoiceModel from "@/models/invoiceModel";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const {
      companyName,
      streetAddress,
      city,
      state,
      zip,
      issueDate,
      paymentTerms,
      items,
    } = req.body;

    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (
      !companyName ||
      !streetAddress ||
      !city ||
      !state ||
      !zip ||
      !issueDate ||
      !paymentTerms ||
      !items
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const invoiceNumber = crypto.randomInt(10000, 99999).toString();

    const formattedItems = items.map((item: any) => ({
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
      total: item.qty * item.price,
    }));

    const amount = formattedItems.reduce(
      (sum: number, item: { total: number }) => sum + item.total,
      0
    );

    const createdAt = new Date();

    const invoice = new invoiceModel({
      userId,
      invoiceNumber,
      companyName,
      streetAddress,
      city,
      state,
      zip,
      issueDate,
      paymentTerms,
      items: formattedItems,
      amount,
      createdAt,
    });

    await invoice.save();

    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res
      .status(500)
      .json({ message: "Server error. Unable to create invoice." });
  }
};
