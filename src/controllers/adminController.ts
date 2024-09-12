import Admin from "@/models/adminModel";
import { generateToken } from "@/utils.ts/generateToken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Admin
export const registerAdmin = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Admin
export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      generateToken(),
      { expiresIn: "1h" }
    );

    if (!token) {
      return res.status(500).json({ msg: "Failed to generate token" });
    }

    return res.status(200).json({ msg: "Admin logged in successfully", token });
  } catch (error) {
    console.log("Admin login failed", error);
    return res.status(500).json({ msg: "Admin login failed", error });
  }
};
