import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        videoUrl: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
        views: { type: Number, default: 0 },
    },
    {timestamps: true}
);

const Video = mongoose.model("Video", videoSchema);
export default Video;