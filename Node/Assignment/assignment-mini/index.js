import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/DB";
import userRouter from "./router/user.router";
import errorHandler from "./middlewares/error.middleware";
dotenv.config();

const PORT=process.env.PORT || 8080;
const app=express();
app.use(express.json());


// user
app.use("/api/v1/users", userRouter);

app.use(errorHandler);
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
    console.log("connection to db",PORT);
  })
})
.catch((error)=>{
    console.log("Mongo db connection Failed", error);
})

