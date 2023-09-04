import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
}, { timestamps: true });

export default mongoose.model('Admin', AdminSchema);