import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

export const sendOTPEmail = async (
  email: string,
  otp: number
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your otp code",
    text: `Your OTP is ${otp}`,
    
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error occured while sending email ", error);
  }
};
