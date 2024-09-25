import userModel from "@/models/userModel";
import generateOtp from "@/utils.ts/generateOtp";
import { sendOTPEmail } from "@/utils.ts/sendOtpEmail";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/utils.ts/generateToken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const plans = {
  free: 0,
  business: 20,
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ msg: "Email not found" });
  }
  try {
    const otp = generateOtp(6);
    const user = new userModel({
      email,
      otp,
    });
    await user.save();
    await sendOTPEmail(email, otp);
    return res.status(200).json({ msg: "Otp sent to your email" });
  } catch (error) {
    console.log("Error occured while registering user");
    return res.status(500).json({ msg: "Error to send email", error });
  }
};

export const otpVerification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { otp } = req.body;
  if (!otp || !id) {
    return res.status(404).json({ msg: "Invalid OTP or Id" });
  }
  try {
    const userId = new ObjectId(id);
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      console.log(otp);
      return res.status(404).json({ msg: "User Not Found" });
    }
    if (otp === user?.otp) {
      return res.status(200).json({ msg: "User Verified" });
    } else {
      return res.status(401).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Otp verification failed", error });
  }
};

export const userLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    if (!token) {
      return res.status(500).json({ msg: "Failed to generate token" });
    }
    return res.status(200).json({ msg: "User logged in Successfully", token });
  } catch (error) {
    console.log("User login Failed", error);
    return res.status(500).json({ msg: "User login failed", error });
  }
};

export const selectPlan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, plan } = req.body;

  if (!plan || !plans.hasOwnProperty(plan)) {
    return res.status(400).json({
      error: 'Invalid plan. Please choose either "free" or "business".',
    });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    user.plan = plan;
    await user.save();

    const totalAmount = plans[plan as keyof typeof plans];

    return res.status(200).json({
      message: `You have selected the ${plan} plan.`,
      plan: plan,
      totalAmount: totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};
