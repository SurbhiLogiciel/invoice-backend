import { UserModel } from "@/models/userModel";
import generateOtp from "@/utils.ts/generateOtp";
import { sendOTPEmail } from "@/utils.ts/sendOtpEmail";
import { JWT_SECRET } from "@/utils.ts/generateToken";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const registerUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(id);

    const { companyId, fullName, phoneNumber, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    if (!companyId) {
      return res.status(400).json({ msg: "Company ID is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        companyId,
        fullName,
        phoneNumber,
        password: hashedPassword,
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User profile registered successfully" });
  } catch (error) {
    console.log("Error occurred while adding user profile:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const registerUserEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const otp = generateOtp(6);
    const user = new UserModel({
      email,
      otp,
    });

    await user.save();

    await sendOTPEmail(email, otp);
    return res
      .status(201)
      .json({ msg: "Otp sent to your email", userId: user._id });
  } catch (error) {
    console.log("Error occurred while registering user:", error);
    return res.status(500).json({ msg: "Error sending email", error });
  }
};


export const otpVerification = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { otp } = req.body;

  try {
    const userId = new ObjectId(id);
    const user = await UserModel.findOne({ _id: userId });
    
    if (!user) {
      console.log(otp);
      return res.status(404).json({ msg: "User Not Found" });
    }
     console.log("Received OTP:", otp);
     console.log("Stored OTP:", user?.otp);
    
    console.log("Otp verification workinhg=")
     if (String(otp) === String(user?.otp)) {
       console.log("OTP verified successfully");
       return res.status(200).json({ msg: "User Verified", userId: user._id });
     } else {
       return res.status(401).json({ msg: "Otp sent to your email" });
     }
  } catch (error) {
    return res.status(500).json({ msg: "Otp verification failed", error });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    console.log("login function is working ");
    
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ msg: "User logged in Successfully", token });
  } catch (error) {
    console.log("User login Failed", error);
    return res.status(500).json({ msg: "User login failed", error });
  }
};

export const dummyApi = (req: Request, res: Response) => {
  try {
    return res.status(200).json({ msg: "Hello from dummy API" });
  } catch (error) {
    console.log("Error in dummyApi", error);
    return res.status(500).json({ msg: "Error in dummyApi", error });
  }
};
