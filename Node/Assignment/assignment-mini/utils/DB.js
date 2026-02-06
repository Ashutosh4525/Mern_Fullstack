import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const url=process.env.MONGODB_URI;

const connectDB=async () => {
  mongoose.connect(url)
  .then(() => console.log('Mongoose connected to Atlas!'))
  .catch(err => console.error('Connection error:', err));
};

export default connectDB;


