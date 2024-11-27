import { request, Request, Response } from "express";
import Invoice from "@/models/invoiceModel";
import mongoose from "mongoose";
import userModel from "@/models/userModel";

export const invoiceListing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 10, userId } = req.query;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
      return res.status(400).json({ msg: "Invalid User ID format" });
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    const skip = (pageNum - 1) * limitNum;

    const invoices = await Invoice.find({ userId })
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalItems = await Invoice.countDocuments({ userId });

    return res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      currentPage: pageNum,
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices by user ID:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { userId, invoiceId } = req.params;
    const {
      invoiceNumber,
      companyName,
      streetAddress,
      city,
      state,
      zip,
      issueDate,
      paymentTerms,
      status,
      items,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(400).json({ message: "Invalid Invoice ID." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const formattedItems = items.map((item: any) => {
      const total = parseFloat(item.qty) * parseFloat(item.price);
      return {
        itemName: item.itemName,
        qty: parseFloat(item.qty),
        price: parseFloat(item.price),
        total: parseFloat(total.toFixed(2)),
      };
    });

    const amount = formattedItems.reduce(
      (sum: number, item: { total: number }) => sum + item.total,
      0
    );

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      {
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
        amount: parseFloat(amount.toFixed(2)),
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getInvoiceData = async (req: Request, res: Response) => {
  try {
    const { userId, invoiceId } = req.params;
    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }
    if (!invoiceId) {
      return res.status(400).json({ msg: "Invoice ID is required" });
    }
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserFullName = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user.fullName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { userId, invoiceId } = req.params;
    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }
    if (!invoiceId) {
      return res.status(400).json({ msg: "Invoice ID is required" });
    }
    const user = await Invoice.findByIdAndDelete(invoiceId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Invoice deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
