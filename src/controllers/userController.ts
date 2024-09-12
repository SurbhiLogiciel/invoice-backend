import userModel from "@/models/userModel";
import generateOtp from "@/utils.ts/generateOtp";
import { sendOTPEmail } from "@/utils.ts/sendOtpEmail";
import { Request, Response } from "express";

export const registerUser = async(req: Request, res: Response):Promise<Response> => {
    const { email } = req.body;
    if(!email) {
        return res.status(404).json({ msg: "Email not found"});
    }
    try{
        const otp = generateOtp(6);
        const user = new userModel({
            email,
            otp
        });
        await user.save();
        await sendOTPEmail(email, otp)
        return res.status(200).json({ msg: "Otp sent to your email"});

    } catch(error) {
        console.log("Error occured while registering user");
        return res.status(500).json({ msg: "Error to send email",error})
        
    }

}

