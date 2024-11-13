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
  createdAt: Date;
}

const InvoiceSchema = new Schema<InvoiceDocument>({
  invoiceNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  issueDate: { type: Date, required: true },
  paymentTerms: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Default value to current date
});

const Invoice = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);
export default Invoice;
