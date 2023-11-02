import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import cors from 'cors'

const port = process.env.PORT || 5000;


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors())


app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("Server is up and running.");
})

app.listen(port, () => {
    console.log(`[server] Listening on http://localhost:${port}`);
})
