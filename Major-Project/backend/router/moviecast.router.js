import express from "express"
import {
 createMovieCast,
 getMovieCast,
 deleteMovieCast
} from "../controller/moviecast.controller.js"
import { verifyAdmin, Authverify } from "../middlewares/auth.middleware.js"
import { movieCastValidator } from "../validators/moviecast.validator.js"

const movieCastRouter = express.Router()

movieCastRouter.post("/cast-create",movieCastValidator.create, Authverify,verifyAdmin ,createMovieCast)

movieCastRouter.get("/:movieId",movieCastValidator.getByMovie, getMovieCast)

movieCastRouter.delete("/:id", movieCastValidator.delete, Authverify,verifyAdmin ,deleteMovieCast)

export default movieCastRouter