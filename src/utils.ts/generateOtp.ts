import crypto from "crypto";

const generateOtp = (length: number) => {
  const otp = crypto.randomInt(0, Math.pow(10, length));
  return otp;
};
export default generateOtp;
