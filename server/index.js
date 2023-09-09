import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import productRouter from "./routes/product.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);

const startServer = async () => {
    await mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.bewrwoe.mongodb.net/onlineShop?retryWrites=true&w=majority')
        .then(() => console.log('DB ok'))
        .catch((err) => console.log(err));

    app.listen(5000, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('server ok');
    });
};

startServer();