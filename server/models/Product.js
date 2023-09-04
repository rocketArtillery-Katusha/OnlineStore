import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    status: { type: String, default: 'sale' },
    price: { type: Number, default: 0 },
    amoоunt: { type: Number, default: 0 },
    description: { type: String, required: true },
    color: { type: String },
    images: [{ type: String, required: true }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);