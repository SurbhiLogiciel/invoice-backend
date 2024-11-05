import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController";
import { verifyToken } from "@/middlewares/adminAuthMiddleware";
import { validateLogin, validateRegister } from "@/validations/adminValidation";

const adminRoute = express.Router();

// Register Admin Route
adminRoute.post("/register/admin", validateRegister, registerAdmin);

// Login Admin Route
adminRoute.post("/login/admin", validateLogin, loginAdmin);

adminRoute.get("/protected/admin", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.admin });
});

export default adminRoute;
