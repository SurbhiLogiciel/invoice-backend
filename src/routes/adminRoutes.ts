import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController";

const adminRoute = express.Router();

// Register Admin Route
adminRoute.post("/register/admin", registerAdmin);

// Login Admin Route
adminRoute.post("/login/admin", loginAdmin);

export default adminRoute;
