import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
}, { timestamps: true });

export default mongoose.model('Admin', AdminSchema);