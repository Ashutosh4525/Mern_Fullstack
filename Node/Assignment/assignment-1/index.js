import express from "express"
import mongoose from "mongoose"
import brandRouter from "./Router/brand.router.js";
import categoryRouter from "./Router/category.router.js";

const app=express();
const port = 8001
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/node-19-jan")
.then(res=>{
    console.log("Mongoose connected");
})
.catch(err=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log("Connected at "+port);
})

// app.get("/",(req,res)=>{
//     res.send (`<div style="color:blue;">Hello</div>`)
// })
app.use("/api/v1/brands", brandRouter)
app.use("/api/v1/categories", categoryRouter)

