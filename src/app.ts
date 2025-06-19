import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
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

app.use('/api/v1/users', userRouter)
app.get('/',(req,res)=>{
res.status(200).json({message:"okkkkkkkkk"})
})

export default app;