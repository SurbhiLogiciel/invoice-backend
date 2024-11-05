import express from "express";
import { registerCompany } from "../controllers/companyController";
import { validateCompanyRegistration } from "@/validations/companyValidation";

const companyRoute = express.Router();

companyRoute.post(
  "/register/companyProfile/:id",
  validateCompanyRegistration,
  registerCompany
);

export default companyRoute;
