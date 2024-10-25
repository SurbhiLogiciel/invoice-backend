import express from "express";
import { validateRequest } from "@/middlewares/validationMiddleware";
import { userValidation } from "@/schemas/userValidationSchema";
import { createUserSchema } from "@/schemas/createUserSchema";
import {
  registerUserProfile,
  registerUserEmail,
  otpVerification,
  userLogin,
  dummyApi,
  selectPlan,
} from "@/controllers/userController";
import { verifyToken } from "@/middlewares/userAuthMiddleware";
import { validateRequest } from "@/middlewares/validationMiddleware";
import { userValidation } from "@/schemas/userValidationSchema";
import { createUserSchema } from "@/schemas/createUserSchema";
import {
  registerUserProfile,
  registerUserEmail,
  otpVerification,
  userLogin,
  dummyApi,
} from "@/controllers/userController";
import { verifyToken } from "@/middlewares/userAuthMiddleware";

const userRoute = express.Router();
console.log("ssd");
userRoute.post(
  "/register/userProfile/:id",
  validateRequest(createUserSchema),
  registerUserProfile
);

userRoute.post(
  "/register/userEmail",
  validateRequest(userValidation),
  registerUserEmail
);
userRoute.post(
  "/register/verifyOtp/:id",
  validateRequest(userValidation),
  otpVerification
);
console.log("ssd");
userRoute.post(
  "/register/userProfile/:id",
  validateRequest(createUserSchema),
  registerUserProfile
);

userRoute.post(
  "/register/userEmail",
  validateRequest(userValidation),
  registerUserEmail
);
userRoute.post(
  "/register/verifyOtp/:id",
  validateRequest(userValidation),
  otpVerification
);

userRoute.post("/user/login", validateRequest(userValidation), userLogin);
userRoute.get("/dummy", validateRequest(userValidation), verifyToken, dummyApi);

userRoute.post("/user/select-plan", selectPlan);
userRoute.post("/user/login", validateRequest(userValidation), userLogin);
userRoute.get("/dummy", validateRequest(userValidation), verifyToken, dummyApi);

export default userRoute;
