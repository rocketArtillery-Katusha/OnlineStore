import { config } from "dotenv";

config();

export const MONGODB_URL: string = process.env.MONGODB_URL || '';
export const SECRET_KEY: string = process.env.SECRET_KEY || '';
export const EXPIRES_IN: string = process.env.EXPIRES_IN || '1d'
export const PORT = process.env.PORT || 4000;