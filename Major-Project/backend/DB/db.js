// import dotenv from "dotenv";
// dotenv.config();
import mongoose from "mongoose";

const url=process.env.MONGODB_URI;

const connectDB=async () => {
  try {
        const connectionInstance = await mongoose.connect(`${url}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
};

export default connectDB;


