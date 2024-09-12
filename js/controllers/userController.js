"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userModel_1 = __importDefault(require("@/models/userModel"));
const generateOtp_1 = __importDefault(require("@/utils.ts/generateOtp"));
const sendOtpEmail_1 = require("@/utils.ts/sendOtpEmail");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log("1");
    if (!email) {
        return res.status(404).json({ msg: "Email not found" });
    }
    try {
        const otp = (0, generateOtp_1.default)(6);
        const user = new userModel_1.default({
            email,
            otp
        });
        yield user.save();
        yield (0, sendOtpEmail_1.sendOTPEmail)(email, otp);
        return res.status(200).json({ msg: "Otp sent to your email" });
    }
    catch (error) {
        console.log("Error occured while registering user");
        return res.status(500).json({ msg: "Error to send email", error });
    }
});
exports.registerUser = registerUser;
// export const otpVerification = async(req: Request, res: Response) => {
//     const { otp } = req.body;
//     if(!otp) {
//         return res.status(404).json({ msg: "otp not found"})
//     }
//     try {
//         const user = await userModel.findOne({ otp });
//         if(otp === user?.otp){
//             return res.status(200).json({ msg: "otp verified"})
//         } else {
//             return res.status(400).json({ msg: "OTP didn't matched"})
//         }
//     } catch(error) {
//         console.log("Error occured while verifying otp");
//         return res.status(500).json({ msg: "Error to verify otp",error})
//     }
// }
