import express from "express"
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, restoreMovie, watchMovie } from "../controller/movie.controller.js"
import { upload } from "../middlewares/upload.middleware.js"
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { movieValidator } from "../validators/movie.validator.js"
const movieRouter = express.Router();

// Define which fields expect files
const movieUpload = upload.fields([
    // { name: "poster", maxCount: 1 },
    // { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 }
]);

// Public Routes
movieRouter.get("/all",movieValidator.pagination,validate, getAllMovies);
movieRouter.get("/get/:id",movieValidator.idParam,validate, getMovieById);


movieRouter.post("/create", Authverify, verifyAdmin, movieUpload, movieValidator.create, validate, createMovie);
movieRouter.put("/update/:id", Authverify, verifyAdmin, movieUpload, movieValidator.idParam, movieValidator.update, validate, updateMovie);
movieRouter.patch("/delete/:id",movieValidator.idParam,validate, Authverify, verifyAdmin, deleteMovie); 
movieRouter.patch("/restore/:id",movieValidator.idParam,validate, Authverify, verifyAdmin, restoreMovie);
movieRouter.get("/watch/:id/stream",movieValidator.idParam,validate,Authverify,watchMovie)


export default movieRouter;
