import Movie from "../models/movie.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import {v2 as cloudinary} from "cloudinary";

export const createMovie = asyncHandler(async (req, res, next) => {
    const { title, description, categoryID, rentalPrice, duration } = req.body;

    if (!title?.trim() || !description?.trim() || !categoryID) {
        const error = new Error("Title, description, and category are required");
        error.code = 400;
        return next(error);
    }

    const posterLocalPath = req.files?.poster?.[0]?.path;
    const trailerLocalPath = req.files?.trailer?.[0]?.path;
    const videoLocalPath = req.files?.video?.[0]?.path;

    if (!posterLocalPath || !videoLocalPath) {
        const error = new Error("Poster and Video files are required");
        error.code = 400;
        return next(error);
    }

    const poster = await uploadOnCloudinary(posterLocalPath, "movies/posters");
    const video = await uploadOnCloudinary(videoLocalPath, "movies/videos");
    const trailer = trailerLocalPath
    ? await uploadOnCloudinary(trailerLocalPath, "movies/trailers")
    : null

    const movie = await Movie.create({
        title,
        description,
        categoryID,
        rentalPrice,
        duration,
        poster: {
            url:poster.url,
            public_id:poster.public_id
        },
        video: {
            url:video.url,
            public_id:video.public_id
        },
        trailer: trailer
            ? {
                url: trailer.url,
                public_id: trailer.public_id
                }
            : null
    });

    return res.status(201).json({
        success: true,
        data: movie,
        message: "Movie created successfully"
    });
});

export const getAllMovies = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const movies = await Movie.find({ isDeleted: false })
    .populate("categoryID")
    .skip(skip)
    .limit(limit);

    const total = await Movie.countDocuments({ isDeleted:false })
    return res.status(200).json({
        success: true,
        totalMovies:total,
        data: movies,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
        message: "Movies fetched successfully"
    });
});

export const getMovieById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id, isDeleted: false }).populate("categoryID");

    if (!movie) {
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: movie
    });
});


export const updateMovie = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    let updateData = { ...req.body };

    // Handle Poster Update
    if (req.files?.poster?.[0]?.path) {
        const poster = await uploadOnCloudinary(req.files.poster[0].path);
        if (movie.poster) {
            // const oldId = movie.poster.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(movie.poster.public_id);
        }
        updateData.poster = {
            url: poster.url,
            public_id: poster.public_id
        };
    }

    if (req.files?.trailer?.[0]?.path) {
    const trailer = await uploadOnCloudinary(
        req.files.trailer[0].path,
        "movies/trailers"
    )

    if (movie.trailer?.public_id) {
        await cloudinary.uploader.destroy(movie.trailer.public_id)
    }

    updateData.trailer = {
        url: trailer.url,
        public_id: trailer.public_id
    }
    }

    if (req.files?.video?.[0]?.path) {

    const video = await uploadOnCloudinary(
        req.files.video[0].path,
        "movies/videos"
    )

    if (movie.video?.public_id) {
        await cloudinary.uploader.destroy(movie.video.public_id)
    }

    updateData.video = {
        url: video.url,
        public_id: video.public_id
    }
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res.status(200).json({
        success: true,
        data: updatedMovie,
        message: "Movie updated successfully"
    });
});

export const deleteMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                isDeleted: true,
                deletedAt: new Date()
            }
        },
        { new: true }
    );

    if (!movie) {
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Movie moved to trash (will be deleted in 30 days)"
    });
});

export const restoreMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: false, deletedAt: null } },
        { new: true }
    );

    if (!movie) {
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: movie,
        message: "Movie restored from trash"
    });
});
