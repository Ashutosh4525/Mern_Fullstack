import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// const url=process.env.MONGODB_URI;

const connectDB=async () => {
  try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME, // This is the most reliable way
    })
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
};

export default connectDB;


