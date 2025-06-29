import express from "express";
import { getCurrentUser, updateUser, deleteUser, subscribeUser, unsubscribeUser } from "../controllers/user.controller.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = express.Router();

router.get("/me", asyncHandler(verifyToken), asyncHandler(getCurrentUser));
router.put("/update", asyncHandler(verifyToken), asyncHandler(updateUser));
router.delete("/delete", asyncHandler(verifyToken), asyncHandler(deleteUser));
router.put("/subscribe/:id", asyncHandler(verifyToken), asyncHandler(subscribeUser));
router.put("/unsubscribe/:id", asyncHandler(verifyToken), asyncHandler(unsubscribeUser));

export default router;