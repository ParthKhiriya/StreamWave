import express from "express";
import {
  addComment,
  getVideoComments,
  deleteComment,
} from "../controllers/comment.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";

const router = express.Router();

// Add a comment to a video
router.post("/", asyncHandler(verifyToken), asyncHandler(addComment));

// Get all comments for a video
router.get("/:videoId", asyncHandler(getVideoComments));

// Delete a specific comment
router.delete("/:commentId", asyncHandler(verifyToken), asyncHandler(deleteComment));

export default router;
