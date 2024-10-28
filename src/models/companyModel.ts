import mongoose, { Schema, model, Document } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  location: string;
  city: string;
  state: string;
  zip: string;
  userId: mongoose.Types.ObjectId;
}

const companySchema = new Schema<ICompany>({
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // Ensure this field is required
  },
});

const Company = model<ICompany>("Company", companySchema);
export default Company;
