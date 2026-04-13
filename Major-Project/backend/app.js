import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./router/user.router.js"
import movieRouter from "./router/movie.router.js"
import castRouter from "./router/cast.router.js"
import movieCastRouter from "./router/moviecast.router.js"
import paymentRouter from "./router/payment.router.js"
import rentalRouter from "./router/rental.router.js"
import categoryRouter from "./router/category.router.js"
import contentRouter from "./router/content.router.js"
import episodeRouter from "./router/episode.router.js"
import seasonRouter from "./router/season.router.js"
import errorHandler from "./middlewares/err.middleware.js"
import { limiter } from "./middlewares/rateLimit.middleware.js"

const app=express()
const allowedOrigins = process.env.CORS_ORIGIN
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // allow requests without origin (Postman, server calls)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // console.log("❌ CORS blocked:", origin);
    return callback(null, false); // ✅ IMPORTANT FIX
  },
  credentials: true,
}));

// ✅ handle preflight requests
app.options(/.*/, cors());

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(limiter)

app.use("/api/v1/users",userRouter)
app.use("/api/v1/movie",movieRouter)
app.use("/api/v1/movie-Cast",movieCastRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/rental",rentalRouter)
app.use("/api/v1/cast",castRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/content",contentRouter)
app.use("/api/v1/episode",episodeRouter)
app.use("/api/v1/season",seasonRouter)


app.use(errorHandler)


export {app}