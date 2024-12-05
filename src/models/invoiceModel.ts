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
  invoiceNumber: { type: String, required: false },
  companyName: { type: String, required: false },
  streetAddress: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  issueDate: { type: Date, required: false },
  paymentTerms: { type: String, required: false },
  items: [
    {
      itemName: { type: String, required: false },
      qty: { type: Number, required: false },
      price: { type: Number, required: false },
      total: { type: Number, required: false },
    },
  ],
  amount: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  userId: { type: String, required: true },
});

const Invoice = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);
export default Invoice;
