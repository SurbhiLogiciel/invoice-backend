import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const MAIL_USER = process.env.EMAIL_USER;
export const MAIL_PASS = process.env.EMAIL_PASS;
