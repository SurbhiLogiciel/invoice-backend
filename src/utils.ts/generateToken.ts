import crypto from "crypto";

export const JWT_SECRET = crypto.randomBytes(32).toString("hex");
