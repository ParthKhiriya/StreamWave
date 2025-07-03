import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import Video from "../models/video.model.ts";
import fs from "fs";
import mongoose from "mongoose";
import { RequestHandler } from "express";

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl: `/uploads/${req.file.filename}`,
      user: userId
    });

    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ message: "Failed to upload video", error });
  }
};

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos", error });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video", error });
  }
};

export const getUserVideos = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const videos = await Video.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user videos", error });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.id;
    const userId = req.userId; // Comes from JWT middleware

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this video" });
    }

    // Delete file from /uploads
    fs.unlink(`uploads/${video.videoUrl.split("/uploads/")[1]}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      }
    });

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video", error });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const isLiked = video.likes.some((id) => id.equals(userObjectId));

    if (isLiked) {
      video.likes = video.likes.filter((id) => !id.equals(userObjectId));
    } else {
      video.likes.push(userObjectId);
    }

    await video.save();
    res.status(200).json({ message: isLiked ? "Unliked" : "Liked" });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error });
  }
};

export const incrementViews = async (req: Request, res: Response) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ message: "View count incremented", views: video.views });
  } catch (error) {
    res.status(500).json({ message: "Failed to increment views", error });
  }
};

export const dislikeVideo = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.id;
    const userId = req.userId; // this is string | undefined

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);

    const hasDisliked = video.dislikes.some(
      (id) => id.toString() === userId
    );

    const hasLiked = video.likes.some(
      (id) => id.toString() === userId
    );

    if (hasDisliked) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      video.dislikes.push(objectUserId);
      if (hasLiked) {
        video.likes = video.likes.filter(
          (id) => id.toString() !== userId
        );
      }
    }

    await video.save();
    res.status(200).json({ message: "Dislike status updated", video });
  } catch (error) {
    console.error("Error in dislikeVideo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search videos by title, description, or tags
export const searchVideos = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [query.toLowerCase()] } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

// Filter videos by tags
export const filterVideosByTags = async (req: Request, res: Response) => {
  try {
    const tags = (req.query.tags as string)?.split(",").map(tag => tag.trim().toLowerCase());

    if (!tags || tags.length === 0) {
      return res.status(400).json({ message: "No tags provided for filtering" });
    }

    const videos = await Video.find({
      tags: { $in: tags },
    }).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Filtering by tags failed", error });
  }
};

// Get recommended videos based on tags of a given video
export const getRecommendedVideos = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.id;

    const currentVideo = await Video.findById(videoId);
    if (!currentVideo) return res.status(404).json({ message: "Video not found" });

    const recommendedVideos = await Video.find({
      _id: { $ne: videoId },
      tags: { $in: currentVideo.tags },
    }).limit(10);

    res.status(200).json(recommendedVideos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations", error });
  }
};
