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
exports.dummyApi = exports.userLogin = exports.otpVerification = exports.registerUser = void 0;
const userModel_1 = require("@/models/userModel");
const generateOtp_1 = __importDefault(require("@/utils.ts/generateOtp"));
const sendOtpEmail_1 = require("@/utils.ts/sendOtpEmail");
const generateToken_1 = require("@/utils.ts/generateToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const otp = (0, generateOtp_1.default)(6);
        const user = new userModel_1.UserModel({
            email,
            otp,
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
const otpVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { otp } = req.body;
    try {
        const userId = new mongodb_1.ObjectId(id);
        const user = yield userModel_1.UserModel.findOne({ _id: userId });
        if (!user) {
            console.log(otp);
            return res.status(404).json({ msg: "User Not Found" });
        }
        if (otp === (user === null || user === void 0 ? void 0 : user.otp)) {
            return res.status(200).json({ msg: "User Verified" });
        }
        else {
            return res.status(401).json({ msg: "Invalid OTP" });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Otp verification failed", error });
    }
});
exports.otpVerification = otpVerification;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, generateToken_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({ msg: "User logged in Successfully", token });
    }
    catch (error) {
        console.log("User login Failed", error);
        return res.status(500).json({ msg: "User login failed", error });
    }
});
exports.userLogin = userLogin;
const dummyApi = (req, res) => {
    try {
        return res.status(200).json({ msg: "Hello from dummy API" });
    }
    catch (error) {
        console.log("Error in dummyApi", error);
        return res.status(500).json({ msg: "Error in dummyApi", error });
    }
};
exports.dummyApi = dummyApi;
