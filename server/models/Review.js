import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    review: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);