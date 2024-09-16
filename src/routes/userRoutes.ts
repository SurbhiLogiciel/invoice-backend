import express from "express";
import { validateRequest } from "@/middlewares/validationMiddleware";
import { userValidation } from "@/schemas/userValidationSchema";
import {
  registerUser,
  otpVerification,
  userLogin,
  dummyApi,
} from "@/controllers/userController";
import { verifyToken } from "@/middlewares/userAuthMiddleware";

const userRoute = express.Router();

userRoute.post("/register/user", validateRequest(userValidation), registerUser);
userRoute.post("/register/verifyOtp/:id", validateRequest(userValidation), otpVerification);

userRoute.post("/user/login", validateRequest(userValidation), userLogin);
userRoute.get("/dummy",validateRequest(userValidation), verifyToken, dummyApi);

export default userRoute;
