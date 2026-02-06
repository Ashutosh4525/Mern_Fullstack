import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/DB";
dotenv.config();

const app=express();

const PORT=process.env.PORT || 8080;


connectDB()
.then(()=>{
    app.listen(PORT,()=>{
    console.log("connection to db",PORT);
  })
})
.catch((err)=>{
    console.log("Mongo db connection Failed", err);
    
})

