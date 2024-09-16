import nodemailer from "nodemailer";

export const sendOTPEmail = async (
  email: string,
  otp: number,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "richa@logiciel.io",
      pass: "@1605richa",
    },
  });

  const mailOptions = {
    from: "invoicing96@gmail.com",
    to: email,
    subject: "Your otp code",
    text: `Your OTP is ${otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error occured while sending email ", error);
  }
};
