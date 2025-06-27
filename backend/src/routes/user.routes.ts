import express from "express";
import { getCurrentUser, updateUser, deleteUser } from "../controllers/user.controller.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = express.Router();

router.get("/me", asyncHandler(verifyToken), asyncHandler(getCurrentUser));
router.put("/update", asyncHandler(verifyToken), asyncHandler(updateUser));
router.delete("/delete", asyncHandler(verifyToken), asyncHandler(deleteUser));

export default router;