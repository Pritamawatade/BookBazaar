import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } 
};

export default connectDB;
