import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/DB";
import userRouter from "./router/user.router";
import errorHandler from "./middlewares/error.middleware";
import bookRouter from "./router/book.router";
import authorRouter from "./router/author.route";
import cors from "cors";
dotenv.config();

const PORT=process.env.PORT || 8080;
const app=express();
app.use(express.json());
app.use("/images",express.static("uploads"))
app.use(express.static("public"))
app.use(cors({
  origin:['http://127.0.0.1:5500','http://localhost:5174']
}))


// user
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter)


app.use(errorHandler);
connectDB()
.then(()=>{
    app.listen(PORT,'0.0.0.0',()=>{
    console.log("connection to db",PORT);
  })
})
.catch((error)=>{
    console.log("Mongo db connection Failed", error);
})

