import express from "express";
import mongoose from "mongoose"
import userRouter from "./router/user.router";
import createRouter from "./router/category.router";


const app=express();
const port=8000;
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/node-16-jan")
.then(res=>{
    console.log("Mongoose connnected");  
})
.catch(err=>{console.log(err);
})
app.listen(port,()=>{
    console.log("connected at "+port);
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/categories",createRouter)
