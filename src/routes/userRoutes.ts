import express from "express";
import { registerUser } from "@/controllers/userController";

const userRoute = express.Router();

userRoute.post("/register/user", registerUser);
// userRoute.post('verifyOtp', otpVerification)
export default userRoute;