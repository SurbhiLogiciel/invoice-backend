import mongoose, { Schema, Document } from "mongoose";

interface InvoiceDocument extends Document {
  invoiceNumber: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  issueDate: Date;
  paymentTerms: string;
  items: Array<{
    itemName: string;
    qty: number;
    price: number;
    total: number;
  }>;
  amount: number;
  createdAt: Date;
  status: string;
  userId: string;
}

const InvoiceSchema = new Schema<InvoiceDocument>({
  invoiceNumber: { type: String },
  companyName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  issueDate: { type: Date },
  paymentTerms: { type: String },
  items: [
    {
      itemName: { type: String },
      qty: { type: Number },
      price: { type: Number },
      total: { type: Number },
    },
  ],
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  userId: { type: String, required: true },
});

const Invoice = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);
export default Invoice;
