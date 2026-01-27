import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Router/user.router";
import brandRouter from "./Router/brand.router";
import categoryRouter from "./Router/category.router";
import ProductRouter from "./Router/product.router";


const PORT=process.env.PORT || 8080;
const app=express(); 
app.use(express.json());

app.listen(PORT,()=>{
    console.log("Database Connected");
})
// console.log("EMAIL_USER =>", process.env.EMAIL_USER);
// console.log("EMAIL_PASS =>", process.env.EMAIL_PASS);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);
mongoose.connect("mongodb://127.0.0.1:27017/node-20Jan").then(()=>{console.log("Connected DB")
}).catch((err)=>{console.log(err)
})


app.use("/api/v1/users",userRouter)
app.use("/api/v1/brands",brandRouter)
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/products",ProductRouter)

