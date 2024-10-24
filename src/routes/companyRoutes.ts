import express from "express";
import { registerCompany } from "../controllers/companyController";

const companyRoute = express.Router();

companyRoute.post("/register/company", registerCompany);

export default companyRoute;
