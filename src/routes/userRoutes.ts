import express from "express";
import {
  registerUser,
  otpVerification,
  userLogin,
  selectPlan,
} from "@/controllers/userController";

const userRoute = express.Router();

userRoute.post("/register/user", registerUser);
userRoute.post("/register/verifyOtp/:id", otpVerification);

userRoute.post("/user/login", userLogin);

userRoute.post("/user/select-plan", selectPlan);

export default userRoute;
