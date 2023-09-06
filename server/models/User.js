import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String },
    status: { type: String, default: 'user' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);