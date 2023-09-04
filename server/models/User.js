import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    basket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);