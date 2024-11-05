import mongoose, { Schema, Model, Document } from "mongoose";

interface User extends Document {
  fullName: string;
  email: string;
  otp: number;
  phoneNumber: string;
  password: string;
  plan: string;
  companyId: string;
}

const UserSchema: Schema<User> = new Schema({
  companyId: { type: String },
  fullName: { type: String, minlength: 5, maxlength: 15 },
  password: { type: String, minlength: 4, maxlength: 10 },
  email: { type: String, unique: true },
  otp: { type: Number },
  plan: { type: String },
  phoneNumber: { type: String, minlength: 10, maxlength: 10 },
});

const userModel: Model<User> = mongoose.model<User>("User", UserSchema);
export default userModel;
