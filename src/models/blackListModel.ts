import mongoose, { Schema, Document } from "mongoose";

interface BlacklistedToken extends Document {
  token: string;
  expiresAt: Date;
}

const BlacklistSchema = new Schema<BlacklistedToken>({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const BlacklistModel = mongoose.model<BlacklistedToken>(
  "Blacklist",
  BlacklistSchema
);
