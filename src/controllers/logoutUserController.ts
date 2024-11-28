import { Request, Response } from "express";

const logoutUser = (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; 

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required for logout" });
    }

    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error });
  }
};

export default logoutUser;
