"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = require("@/middlewares/validationMiddleware");
const userValidationSchema_1 = require("@/schemas/userValidationSchema");
const userController_1 = require("@/controllers/userController");
const userAuthMiddleware_1 = require("@/middlewares/userAuthMiddleware");
const userRoute = express_1.default.Router();
userRoute.post("/register/user", (0, validationMiddleware_1.validateRequest)(userValidationSchema_1.userValidation), userController_1.registerUser);
userRoute.post("/register/verifyOtp/:id", (0, validationMiddleware_1.validateRequest)(userValidationSchema_1.userValidation), userController_1.otpVerification);
userRoute.post("/user/login", (0, validationMiddleware_1.validateRequest)(userValidationSchema_1.userValidation), userController_1.userLogin);
userRoute.get("/dummy", (0, validationMiddleware_1.validateRequest)(userValidationSchema_1.userValidation), userAuthMiddleware_1.verifyToken, userController_1.dummyApi);
exports.default = userRoute;
