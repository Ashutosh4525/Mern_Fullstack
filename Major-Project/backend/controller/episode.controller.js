import Episode from "../models/episode.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";
import Season from "../models/season.model.js";
import Rental from "../models/rental.model.js";
export const createEpisode = asyncHandler(async (req, res, next) => {
    const { seasonId, title, episodeNumber, duration } = req.body;

    if (!seasonId || !title || episodeNumber === undefined) {
        const error = new Error("Field missing");
        error.code = 400;
        return next(error);
    }

    const videoLocalPath = req.files?.video?.[0]?.path;

    const season = await Season.findById(seasonId);
    if (!season || season.isDeleted) {
        const error = new Error("Season not found");
        error.code = 400;
        return next(error);
    }

    const exists = await Episode.findOne({ seasonId, episodeNumber, isDeleted:false });
    if (exists) {
        const error = new Error("Already exists");
        error.code = 400;
        return next(error);
    }

    if (!videoLocalPath) {
        const error = new Error("Video required");
        error.code = 400;
        return next(error);
    }

    
    const video = await uploadOnCloudinary(videoLocalPath, "episodes/videos");

    const episode = await Episode.create({
        seasonId,
        title,
        episodeNumber,
        duration,
        video: {
            url: video.url,
            public_id: video.public_id
        }
    });

    return res.status(201).json({ success: true, message: "Episode created", data: episode });
});

export const getEpisodesBySeason = asyncHandler(async (req, res, next) => {
    const { seasonId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // const episodes = await Episode.find({
    //     seasonId,
    //     isDeleted: false
    // }).sort({ episodeNumber: 1 });

    const [episodes, total] = await Promise.all([
        Episode.find({ seasonId, isDeleted: false })
            .sort({ episodeNumber: 1 })
            .skip(skip)
            .limit(limit),
        Episode.countDocuments({ seasonId, isDeleted: false })
    ]);

    // if(episodes.length ===0){
    //     const error = new Error("Episode not found");
    //     error.code = 400;
    //     return next(error);
    // }

    return res.json({
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: episodes
    });
});

export const getEpisodeById = asyncHandler(async (req, res, next) => {
    const episode = await Episode.findOne({
        _id: req.params.id,
        isDeleted: false
    }).populate({
        path: "seasonId",
        select: "seasonNumber contentId"
    });

     if(!episode){
        const error = new Error("Episode not found");
        error.code = 400;
        return next(error);
    }

    return res.json({
        success: true,
        data: episode
    });
});

export const updateEpisode = asyncHandler(async (req, res, next) => {
    const episode = await Episode.findById(req.params.id);

    if (!episode || episode.isDeleted) {
        const error = new Error("Episode not found");
        error.code = 404;
        return next(error);
    }

    const { title, episodeNumber, duration } = req.body;

    if (title) episode.title = title;
    // if (episodeNumber !== undefined) episode.episodeNumber = episodeNumber;
    if (episodeNumber !== undefined) {
        const exists = await Episode.findOne({
            seasonId: episode.seasonId,
            episodeNumber,
            _id: { $ne: episode._id },
            isDeleted: false
        });

        if (exists) {
            const error = new Error("Episode number already exists");
            error.code = 409;
            return next(error);
        }

        episode.episodeNumber = episodeNumber;
    }
    if (duration !== undefined) episode.duration = duration;

    if (req.files?.video?.[0]?.path) {
        const video = await uploadOnCloudinary(req.files.video[0].path, "episodes/videos");

        if (episode.video?.public_id) {
            await cloudinary.uploader.destroy(episode.video.public_id);
        }

        episode.video = {
            url: video.url,
            public_id: video.public_id
        };
    }

    await episode.save();

    return res.json({
        success: true,
        message: "Episode updated",
        data: episode
    });
});

export const deleteEpisode = asyncHandler(async (req, res, next) => {
    const episode = await Episode.findById(req.params.id);

    if(!episode){
        const error = new Error("Episode not found");
        error.code = 400;
        return next(error);
    }

    episode.isDeleted = true;
    episode.deletedAt = new Date();
    await episode.save();

    return res.json({
        success: true,
        message: "Episode deleted"
    });
});

export const restoreEpisode = asyncHandler(async (req, res, next) => {
    const episode = await Episode.findById(req.params.id);

    if(!episode){
        const error = new Error("Episode not found or deleted");
        error.code = 400;
        return next(error);
    }

    episode.isDeleted = false;
    episode.deletedAt = null;
    await episode.save();

    return res.json({
        success: true,
        message: "Episode restored",
        data: episode
    });
});

export const watchEpisode = asyncHandler(async (req, res, next) => {
    const episode = await Episode.findOne({
        _id: req.params.id,
        isDeleted: false
    });

    const userId = req.user._id;
     if (!episode) {
        const error = new Error("Episode not found");
        error.code = 404;
        return next(error);
    }

    const rental = await Rental.findOne({
        userId,
        contentId: episode.contentId,
        expiresAt: { $gt: new Date() }
    });

    if(!rental){
        const error = new Error("You have not rented this movie");
        error.code = 403;
        return next(error);
    }

    const range = req.headers.range;
    if(!range){
        const error = new Error("Range header required");
        error.code = 416;
        return next(error);
    }

    const signedUrl = cloudinary.url(episode.video.public_id, {
        resource_type: "video",
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 300
    });

    const response = await fetch(signedUrl, {
        headers: { Range: range }
    });

    res.set({
        "Content-Type": response.headers.get("content-type"),
        "Content-Length": response.headers.get("content-length"),
        "Content-Range": response.headers.get("content-range")
    });

    return response.body.pipe(res);
});