import mongoose, { Document, Schema } from "mongoose";
interface User extends Document {
  companyId: string;
  fullName: string;
  email: string;
  otp: number;
  phoneNumber: string;
  password: string;
  plan: string;
}

const UserSchema: Schema<User> = new Schema({
  companyId: { type: String },
  fullName: { type: String, minlength: 5, maxlength: 15 },
  password: { type: String, minlength: 4, maxlength: 10 },
  email: { type: String, unique: true },
  otp: { type: Number },
  phoneNumber: { type: String, minlength: 10, maxlength: 10 },
  plan: { type: String, enum: ["free", "business"], default: "free" },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
