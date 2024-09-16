"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const generateOtp = (length) => {
  const otp = crypto_1.default.randomInt(0, Math.pow(10, length));
  return otp;
};
exports.default = generateOtp;
