import { Request, Response } from 'express';
import User from '../models/user.model.ts';

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password"); // exclude password from response
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error: error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password"); // exclude password from response

        if(!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error:error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user id available" });
    }

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Account deletion failed", error });
  }
};