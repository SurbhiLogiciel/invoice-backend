import { Request, Response } from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import invoiceModel from "@/models/invoiceModel";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const {
      companyName = "",
      streetAddress = "",
      city = "",
      state = "",
      zip = "",
      issueDate = "",
      paymentTerms = "",
      status = "DRAFT",
      items = [],
    } = req.body;

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const userId = new mongoose.Types.ObjectId(id);

    if (status !== "DRAFT") {
      if (
        !companyName ||
        !streetAddress ||
        !city ||
        !state ||
        !zip ||
        !issueDate ||
        !paymentTerms ||
        !items.length
      ) {
        return res
          .status(400)
          .json({ message: "All fields are required for non-draft invoices." });
      }
    }

    const invoiceNumber = crypto.randomInt(10000, 99999).toString();
    const formattedItems = (items || []).map((item: any) => ({
      itemName: item?.itemName || "",
      qty: item?.qty || 0,
      price: item?.price || 0,
      total: (item?.qty || 0) * (item?.price || 0),
    }));

    const amount = formattedItems.reduce(
      (sum: number, item: { total: number }) => sum + item.total,
      0
    );

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
      status,
      items: formattedItems,
      amount,
      createdAt: new Date(),
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Failed to create invoice." });
  }
};
