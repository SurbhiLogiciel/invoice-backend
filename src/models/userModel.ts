import mongoose, { Schema, Model, Document } from 'mongoose';

interface User extends Document {
    fullName: string,
    email: string,
    otp: number,
    phoneNumber: string,
    password: string,

}

const userSchema: Schema = new mongoose.Schema({
    fullName: { type: String},
    email: { type: String, unique: true },
    otp: { type: Number},
    phoneNumber: { type: String },
    password: { type: String },
})

const userModel: Model<User> = mongoose.model<User>('User', userSchema);
export default userModel;