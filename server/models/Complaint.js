import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    complaint: [{ type: String, required: true }],
}, { timestamps: true });

export default mongoose.model('Admin', AdminSchema);