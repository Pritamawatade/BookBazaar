
import connectDB from "./utils/db";
import app from "./app";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
});

const PORT = process.env.PORT || 4000;
connectDB()
        .then(()=>{
            app.listen(PORT, ()=>{
                console.log(`server is running at ${PORT}`)
            })
        })
        .catch((error)=>{
            console.log("error while connection Db. error:",error)
            process.exit(1)
        })