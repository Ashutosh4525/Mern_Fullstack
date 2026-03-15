import express from "express"
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, restoreMovie } from "../controller/movie.controller.js"
import { upload } from "../middlewares/upload.middleware.js"
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js"

const movieRouter = express.Router();

// Define which fields expect files
const movieUpload = upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 }
]);

// Public Routes
movieRouter.get("/all", getAllMovies);
movieRouter.get("/get/:id", getMovieById);

// Admin/Protected Routes (Assuming Authverify checks for a logged-in user/admin)
movieRouter.post("/create", Authverify, verifyAdmin,movieUpload, createMovie);
movieRouter.put("/update/:id", Authverify, verifyAdmin, movieUpload, updateMovie);
movieRouter.patch("/delete/:id", Authverify, verifyAdmin, deleteMovie); // Soft delete (TTL index)
movieRouter.patch("/restore/:id", Authverify, verifyAdmin, restoreMovie);


export default movieRouter;