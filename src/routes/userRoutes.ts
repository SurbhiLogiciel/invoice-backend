import express from "express";
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
  registerUserPlan,
  applyPromoCode,
} from "@/controllers/userController";
import logout from "@/controllers/logoutUserController";
import logoutUser from "@/controllers/logoutUserController";

const userRoute = express.Router();
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

userRoute.post("/user/selectPlan/:id", registerUserPlan);
userRoute.post("/user/applyPromoCode/:id", applyPromoCode);
userRoute.post("/user/login", validateRequest(userValidation), userLogin);
userRoute.get("/dummy", validateRequest(userValidation), verifyToken, dummyApi);


// logout user
userRoute.post("/logoutUser", logoutUser);
export default userRoute;
