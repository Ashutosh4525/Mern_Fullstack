import express from "express"
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, restoreMovie, watchMovie } from "../controller/movie.controller.js"
import { upload } from "../middlewares/upload.middleware.js"
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js"
import { movieValidator } from "../validators/movie.validator.js"
const movieRouter = express.Router();

// Define which fields expect files
const movieUpload = upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 }
]);

// Public Routes
movieRouter.get("/all",movieValidator.pagination, getAllMovies);
movieRouter.get("/get/:id",movieValidator.idParam, getMovieById);


movieRouter.post("/create", movieValidator.create,Authverify, verifyAdmin,movieUpload, createMovie);
movieRouter.put("/update/:id",movieValidator.idParam, movieValidator.update,Authverify, verifyAdmin, movieUpload, updateMovie);
movieRouter.patch("/delete/:id",movieValidator.idParam, Authverify, verifyAdmin, deleteMovie); 
movieRouter.patch("/restore/:id",movieValidator.idParam, Authverify, verifyAdmin, restoreMovie);
movieRouter.get("/watch/:id",movieValidator.idParam,Authverify,watchMovie)


export default movieRouter;