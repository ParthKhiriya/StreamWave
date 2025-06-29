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

export const subscribeUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const targetUserId = req.params.id;

  if (userId === targetUserId) {
    return res.status(400).json({ message: "You cannot subscribe to yourself." });
  }

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) return res.status(404).json({ message: "User not found" });

    if (!user.subscribedUsers.includes(targetUser._id)) {
      user.subscribedUsers.push(targetUser._id);
      targetUser.subscribers += 1;

      await user.save();
      await targetUser.save();

      return res.status(200).json({ message: "Subscribed successfully" });
    } else {
      return res.status(400).json({ message: "Already subscribed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to subscribe", error });
  }
};

export const unsubscribeUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const targetUserId = req.params.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) return res.status(404).json({ message: "User not found" });

    const index = user.subscribedUsers.indexOf(targetUser._id);
    if (index !== -1) {
      user.subscribedUsers.splice(index, 1);
      targetUser.subscribers -= 1;

      await user.save();
      await targetUser.save();

      return res.status(200).json({ message: "Unsubscribed successfully" });
    } else {
      return res.status(400).json({ message: "Not subscribed to this user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to unsubscribe", error });
  }
};