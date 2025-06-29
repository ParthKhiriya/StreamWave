import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      maxlength: 5000,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: "", // Can be optional and generated later
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // We’ll build this model soon
      },
    ],
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    duration: {
      type: Number, // In seconds (e.g., 125 = 2 mins 5 secs)
    },
    privacy: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
