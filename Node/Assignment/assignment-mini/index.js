import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import connectDB from "./utils/DB";
import userRouter from "./router/user.router";
import errorHandler from "./middlewares/error.middleware";
import bookRouter from "./router/book.router";
import authorRouter from "./router/author.route";
import cors from "cors";


const PORT=process.env.PORT || 8080;
const app=express();
app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use("/images",express.static("uploads"))
app.use(express.static("public"))
app.use(cors({
  origin:['https://mern-fullstack-dun.vercel.app/'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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

