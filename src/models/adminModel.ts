import mongoose, { Schema, Model, Document } from "mongoose";

interface Admin extends Document {
  username: string;
  email: string;
  password: string;
}

const adminSchema: Schema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

const Admin: Model<Admin> = mongoose.model<Admin>("Admin", adminSchema);
export default Admin;
