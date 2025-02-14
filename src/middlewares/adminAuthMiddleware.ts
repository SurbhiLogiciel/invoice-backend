import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@/utils.ts/generateToken";
import Joi from "joi";

declare module "express-serve-static-core" {
  interface Request {
    admin?: JwtPayload;
  }
}

// Verify Token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.admin = user as JwtPayload;
      next();
    });
  } else {
    return res.status(401).json({ message: "Token missing" });
  }
};
