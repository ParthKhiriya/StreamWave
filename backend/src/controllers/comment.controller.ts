import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model.ts";
import Video from "../models/video.model.ts";

// ✅ Add Comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { videoId, content } = req.body;

    if (!videoId || !content) {
      return res.status(400).json({ message: "Video ID and content are required." });
    }

    const newComment = new Comment({
      content,
      user: new mongoose.Types.ObjectId(userId),
      video: new mongoose.Types.ObjectId(videoId),
    });

    await newComment.save();

    // Optional: Push comment reference to video.comments array
    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Failed to add comment", error });
  }
};

// ✅ Get All Comments for a Video
export const getVideoComments = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.videoId;

    const comments = await Comment.find({ video: videoId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

// ✅ Delete a Comment (only if user is owner)
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    // Optional: Remove comment ID from video.comments[]
    await Video.findByIdAndUpdate(comment.video, {
      $pull: { comments: comment._id },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
};
