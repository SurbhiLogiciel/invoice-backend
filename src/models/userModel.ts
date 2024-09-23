import mongoose,{Document, Schema} from "mongoose";
  interface User extends Document {
    fullName: string;
    email: string;
    otp: number;
    phoneNumber: string;
    password: string;
  }

  const UserSchema: Schema<User> = new Schema({
    fullName: { type: String,  minlength: 5, maxlength: 15 },
    password: { type: String,  minlength: 4, maxlength: 10 },
    email: { type: String, unique: true },
    otp: { type: Number  },
    phoneNumber: { type: String, minlength: 10, maxlength: 10 },
  });

  export const UserModel = mongoose.model<User>('User', UserSchema);
  

