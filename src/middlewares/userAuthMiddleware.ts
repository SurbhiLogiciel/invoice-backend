import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BlacklistModel } from "@/models/blackListModel";
import { JWT_SECRET } from "@/utils.ts/generateToken";

declare module "express" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const isBlacklisted = await BlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: "Token has been invalidated" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
