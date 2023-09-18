import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    user: { type: Object, required: true },
    product: { type: Object, required: true },
    complaint: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Complaint', ComplaintSchema);