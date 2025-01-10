import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMsgEmail = async (
  email: string,
  message: string
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
    subject: "Regarding your Invoice Payment",
    html: `
      <div style="font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px; width: 100%; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #875eff; color: white; padding: 15px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Invoice Project</h2>
          <p style="font-size: 14px;">Streamlining your business, one invoice at a time.</p>
        </div>
        <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; margin-top: 10px;">
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            ${message}
          </p>
          <div style="margin-top: 30px; border-top: 1px solid #f1f1f1; padding-top: 20px;">
            <p style="font-size: 12px; color: #777; text-align: center;">
              Thank you for your business!<br />
              The Invoice Project Team
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};
