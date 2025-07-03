import express from "express";
import { uploadVideo, getAllVideos, getVideoById, getUserVideos, deleteVideo, toggleLike, incrementViews, dislikeVideo, searchVideos, filterVideosByTags, getRecommendedVideos } from "../controllers/video.controller.ts";
import { upload } from "../middlewares/upload.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = express.Router();

router.post(
  "/upload",
  asyncHandler(verifyToken),
  upload.single("video"), // 'video' is the field name used in form-data
  asyncHandler(uploadVideo)
);

router.get("/", getAllVideos);
router.get("/:id", asyncHandler(getVideoById));
router.get("/user/:userId", getUserVideos);
router.delete("/:id", asyncHandler(verifyToken), asyncHandler(deleteVideo));
router.put("/:id/like", asyncHandler(verifyToken), asyncHandler(toggleLike));  // Protected
router.put("/:id/view", asyncHandler(incrementViews));           // Public
router.put("/:id/dislike", asyncHandler(verifyToken), asyncHandler(dislikeVideo));
router.get("/search", asyncHandler(searchVideos));
router.get("/filter", asyncHandler(filterVideosByTags));
router.get("/recommend/:id", asyncHandler(getRecommendedVideos));

export default router;
