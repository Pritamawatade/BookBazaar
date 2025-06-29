import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import booksRouter from "./routes/books.routes";
import orderRouter from "./routes/order.routes";

const app = express();
dotenv.config({
    path:'./env'
})
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json());

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/books', booksRouter)
app.use('/api/v1/orders', orderRouter)

export default app;