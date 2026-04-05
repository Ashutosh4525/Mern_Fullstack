import express from "express"
import {
 createMovieCast,
 getMovieCast,
 getAllMovieCast,
 deleteMovieCast
} from "../controller/moviecast.controller.js"
import { verifyAdmin, Authverify } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { movieCastValidator } from "../validators/moviecast.validator.js"

const movieCastRouter = express.Router()

movieCastRouter.post("/cast-create",movieCastValidator.create,validate, Authverify,verifyAdmin ,createMovieCast)
movieCastRouter.post("/create",movieCastValidator.create,validate, Authverify,verifyAdmin ,createMovieCast)

movieCastRouter.get("/all", getAllMovieCast)

movieCastRouter.get("/content/:movieId",movieCastValidator.getByMovie,validate, getMovieCast)
movieCastRouter.get("/:movieId",movieCastValidator.getByMovie,validate, getMovieCast)

movieCastRouter.delete("/:id", movieCastValidator.delete,validate, Authverify,verifyAdmin ,deleteMovieCast)

export default movieCastRouter
