import express from "express";
import dotenv from "dotenv";
import errorHandler from "./Middlewares/err.middleware";
import cors from "cors"

dotenv.config();
const app=express();
const PORT=process.env.PORT||8080;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"]
}))

app.get("/",(req,res)=>{
    return res.status(200).send("🚀 Server is running")
});

app.get("/check",(req,res)=>{
    try {
        const num= Math.ceil(Math.random()*10);
        if (num<=5) {
            return res.status(200).send("Welcome");
        } else {
            const err= new Error("Random number is greater")
            err.statusCode=401;
            throw err
        }
    } catch (err) {
        console.log("🚨ERROR", err);
        return res.status(500).json({
            message:err.message||"Something went wrong",
            success:false
        })
    }
});

app.get("/check1",(req,res)=>{
    const num= Math.ceil(Math.random()*10);
        if (num<=5) {
            return res.status(200).send("Welcome");
        } else {
            const err= new Error("Random number is greater")
            err.statusCode=401;
            throw err
        }
})

app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("🚀 Server is running");
    return "🚀 Server is running"
})