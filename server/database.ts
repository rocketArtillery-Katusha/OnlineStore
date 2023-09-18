import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(MONGODB_URL);
        console.log(db.connection.name, 'conncted');
    } catch (error) {
        console.error(error);
    }
};