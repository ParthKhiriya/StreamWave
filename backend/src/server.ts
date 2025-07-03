import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.ts";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.ts";
import testRoutes from "./routes/test.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import videoRoutes from "./routes/video.routes.ts";
import commentRoutes from "./routes/comment.routes.ts";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/uploads", express.static(path.join("uploads")));
app.use("/api/comments", commentRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("StreamWave is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});