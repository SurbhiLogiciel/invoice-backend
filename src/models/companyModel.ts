import { Schema, model, Document } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  location: string;
  city: string;
  state: string;
  zip: string;
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
});

// Create and export the Company model
const Company = model<ICompany>("Company", companySchema);
export default Company;
