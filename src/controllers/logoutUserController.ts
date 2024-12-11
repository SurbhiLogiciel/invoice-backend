import { BlacklistModel } from "@/models/blackListModel";
import { JWT_SECRET } from "@/utils.ts/generateToken";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; // Cast to JwtPayload to access 'exp'

    const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date();

    await BlacklistModel.create({ token, expiresAt });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
