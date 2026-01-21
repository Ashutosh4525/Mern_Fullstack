import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Router/user.router";


const PORT=process.env.PORT || 8080;
const app=express(); 
app.use(express.json());

app.listen(PORT,()=>{
    console.log("Database Connected");
})

mongoose.connect("mongodb://127.0.0.1:27017/node-20Jan").then(()=>{console.log("Connected DB")
}).catch((err)=>{console.log(err)
})

app.use("/api/v1/users",userRouter)