import express from "express";
import { registerUser, otpVerification, userLogin,  } from "@/controllers/userController";
import { verifyToken } from "@/middlewares/userAuthMiddleware";

const userRoute = express.Router();

userRoute.post("/register/user", registerUser);
userRoute.post("/register/verifyOtp/:id", otpVerification);

userRoute.post("/user/login", userLogin);
// userRoute.get("/dummy", verifyToken, dummyApi);

export default userRoute;