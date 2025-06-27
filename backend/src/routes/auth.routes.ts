import express from 'express';
import { login, register } from "../controllers/auth.controller.ts";
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;