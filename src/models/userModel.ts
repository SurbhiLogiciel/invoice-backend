import mongoose, { Schema, Model, Document } from "mongoose";

interface User extends Document {
  fullName: string;
  email: string;
  otp: number;
  phoneNumber: string;
  password: string;
  plan: string;
  companyId: string;
  amount: number;
  discount: number;
  total: number;
}

const UserSchema: Schema<User> = new Schema({
  companyId: { type: String },
  fullName: { type: String, minlength: 5, maxlength: 15 },
  password: { type: String },
  email: { type: String, unique: true },
  otp: { type: Number },
  phoneNumber: { type: String, minlength: 10, maxlength: 20 },
  plan: { type: String },
  amount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const userModel: Model<User> = mongoose.model<User>("User", UserSchema);
export default userModel;
