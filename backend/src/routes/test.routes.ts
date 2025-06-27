import express from "express";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = express.Router();

// Example protected route
router.get("/protected", asyncHandler(verifyToken), (req, res) => {
  res.json({ message: "Access granted to protected route", userId: req.userId });
});

export default router;
