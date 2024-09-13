import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController";
import { verifyToken } from "@/middlewares/adminAuthMiddleware";

const adminRoute = express.Router();

// Register Admin Route
adminRoute.post("/register/admin", registerAdmin);

// Login Admin Route
adminRoute.post("/login/admin", loginAdmin);

adminRoute.get("/protected/admin", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default adminRoute;
