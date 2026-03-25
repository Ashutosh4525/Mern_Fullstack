import Movie from "../models/movie.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import {v2 as cloudinary} from "cloudinary";
import Rental from "../models/rental.model.js";
import fetch from "node-fetch";

export const createMovie = asyncHandler(async (req, res, next) => {
    const { title, description, categoryID, rentalPrice, duration } = req.body;

    if (!title?.trim() || !description?.trim() || !categoryID) {
        const error = new Error("Title, description, and category are required");
        error.code = 400;
        return next(error);
    }

    if(!Number(rentalPrice) || !Number(duration)){
        const error = new Error("Invalid price or duration");
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
    .select("-video.public_id -video.url")
    .populate("categoryID")
    .skip(skip)
    .limit(limit);

    if(!movies){
        const error = new Error("No movies");
        error.code = 400;
        return next(error);
    }

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
    const movie = await Movie.findOne({_id:id,isDeleted:false});

    if (!movie) {
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    const { title, description, categoryID, rentalPrice, duration } = req.body;
    // let updateData = { ...req.body };

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (categoryID) updateFields.categoryID = categoryID;
    if (rentalPrice !== undefined) updateFields.rentalPrice = Number(rentalPrice);
    if (duration !== undefined) updateFields.duration = Number(duration);
    // Handle Poster Update
    // if (req.files?.poster?.[0]?.path) {
    //     const poster = await uploadOnCloudinary(req.files.poster[0].path,"movies/posters");
    //     if (movie.poster) {
    //         // const oldId = movie.poster.split("/").pop().split(".")[0];
    //         await cloudinary.uploader.destroy(movie.poster.public_id);
    //     }
    //     updateData.poster = {
    //         url: poster.url,
    //         public_id: poster.public_id
    //     };
    // }

    // if (req.files?.trailer?.[0]?.path) {
    // const trailer = await uploadOnCloudinary(
    //     req.files.trailer[0].path,
    //     "movies/trailers"
    // )

    // if (movie.trailer?.public_id) {
    //     await cloudinary.uploader.destroy(movie.trailer.public_id)
    // }

    if (req.files?.poster?.[0]?.path) {
        const poster = await uploadOnCloudinary(req.files.poster[0].path, "movies/posters");
        if (movie.poster?.public_id) await cloudinary.uploader.destroy(movie.poster.public_id);
        updateFields.poster = { url: poster.url, public_id: poster.public_id };
    }

    // Trailer
    if (req.files?.trailer?.[0]?.path) {
        const trailer = await uploadOnCloudinary(req.files.trailer[0].path, "movies/trailers");
        if (movie.trailer?.public_id) await cloudinary.uploader.destroy(movie.trailer.public_id);
        updateFields.trailer = { url: trailer.url, public_id: trailer.public_id };
    }

    // Video
    if (req.files?.video?.[0]?.path) {
        const video = await uploadOnCloudinary(req.files.video[0].path, "movies/videos");
        if (movie.video?.public_id) await cloudinary.uploader.destroy(movie.video.public_id);
        updateFields.video = { url: video.url, public_id: video.public_id };
    }

    // updateData.trailer = {
    //     url: trailer.url,
    //     public_id: trailer.public_id
    // }
    // }

    // if (req.files?.video?.[0]?.path) {

    // const video = await uploadOnCloudinary(
    //     req.files.video[0].path,
    //     "movies/videos"
    // )

    // if (movie.video?.public_id) {
    //     await cloudinary.uploader.destroy(movie.video.public_id)
    // }

    // updateData.video = {
    //     url: video.url,
    //     public_id: video.public_id
    // }
    // }

    const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true }
    ).populate("categoryID");

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

export const watchMovie= asyncHandler(async (req,res,next) => {
    const userId=req.user._id;
    const movieId = req.params.id;

    const rental = await Rental.findOne({
      userId,
      movieId,
      status: "active",
      expiresAt: { $gt: new Date() }
    });

    if(!rental){
        const error = new Error("You have not rented this movie");
        error.code = 403;
        return next(error);
    }

    const movie = await Movie.findOne({_id: movieId, isDeleted: false});

    // if (new Date() > rental.expiresAt) {
    //   rental.status = "expired";
    //   await rental.save();

    //   const error = new Error("Rental expired");
    //   error.code = 403;
    //   return next(error)
    // }

    

    if(!movie){
        const error = new Error("Movie not found");
        error.code = 404;
        return next(error);
    }

    const range = req.headers.range

    if(!range){
        const error = new Error("Range header required");
        error.code = 404;
        return next(error);
    }

    // const videoUrl=movie.video.url
    const signedUrl = cloudinary.url(movie.video.public_id, {
        resource_type: "video",
        sign_url: true,
        expires_at: Math.floor(Date.now()/1000) + 300
    });

    const response = await fetch(signedUrl,{
        headers:{ Range: range }
    })

    res.set({
        "Content-Type": response.headers.get("content-type"),
        "Content-Length": response.headers.get("content-length"),
        "Content-Range": response.headers.get("content-range"),
    })
    return response.body.pipe(res)
    // return request(signedUrl, {
    //     headers: {
    //     Range: range
    //     }
    // }).pipe(res)
    // return res.json({
    //   success: true,
    //   videoUrl: movie.video.url
    // });

})