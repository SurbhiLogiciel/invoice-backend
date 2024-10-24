import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@/utils.ts/generateToken";

declare module "express" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ msg: "Token missing" });
  }
};
