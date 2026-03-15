import express from "express"
import {
 createMovieCast,
 getMovieCast,
 deleteMovieCast
} from "../controllers/movieCast.controller.js"

const router = express.Router()

router.post("/movie-cast", createMovieCast)

router.get("/:movieId", getMovieCast)

router.delete("/:id", deleteMovieCast)

export default router