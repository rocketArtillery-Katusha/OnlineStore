import express from 'express';
import cors from "cors";
import { PORT } from './config';

import { connectDb } from './database';
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/admin', adminRoute);

const startServer = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log('server ok');
    });
};

startServer();