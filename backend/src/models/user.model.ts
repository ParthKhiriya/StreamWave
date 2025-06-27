import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required:true,
            unique:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);