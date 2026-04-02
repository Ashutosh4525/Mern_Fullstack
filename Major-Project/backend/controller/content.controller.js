import Content from "../models/content.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

export const createContent = asyncHandler(async (req, res,next) => {
    const { title, description, type, categoryIds, rentalPrice, releaseDate } = req.body;

    if (!title?.trim() || !description?.trim()) {
        const error = new Error("Title, description are required");
        error.code = 400;
        return next(error);
    }
    if (!["movie", "tv"].includes(type)) {
        const error = new Error("Invalid type");
        error.code = 400;
        return next(error);
    }
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
        const error = new Error("At least one category required");
        error.code = 400;
        return next(error);
    }
    if(rentalPrice === undefined || isNaN(Number(rentalPrice))){
        const error = new Error("Invalid price");
        error.code = 400;
        return next(error);
    }
    const posterLocalPath = req.files?.poster?.[0]?.path;
    const trailerLocalPath = req.files?.trailer?.[0]?.path;

    if (!posterLocalPath || !trailerLocalPath) {
            const error = new Error("Poster and Video files are required");
            error.code = 400;
            return next(error);
        }
    
        const poster = posterLocalPath
            ? await uploadOnCloudinary(posterLocalPath, "content/posters")
            : null;
        const trailer = trailerLocalPath
            ? await uploadOnCloudinary(trailerLocalPath, "movies/trailers")
            : null
    const content = await Content.create({
        title,
        description,
        type,
        categoryIds,
        rentalPrice,
        releaseDate,
        poster: poster
            ?{
                url:poster.url,
                public_id:poster.public_id
            }
            :null,
        trailer: trailer
            ? {
                url: trailer.url,
                public_id: trailer.public_id
                }
            : null
    });

    return res.status(201).json({ success: true, data: content,message:"Content created" });
});

//get all 
export const getAllContent = asyncHandler(async (req, res, next) => {
    const { type, category, search } = req.query;

    let query = { isDeleted: false };

    if (type) query.type = type; 
    if (category) query.categoryIds = category;

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    // const contents = await Content.find(query)
    //     .populate("categoryIds", "name")
    //     .sort({ createdAt: -1 });

    // return res.status(200).json({
    //     success: true,
    //     count: contents.length,
    //     data: contents
    // });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [contents, total] = await Promise.all([
        Content.find(query)
            .populate("categoryIds")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Content.countDocuments(query)
    ]);

    return res.json({
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: contents
    });
});

//get 1
export const getContentById = asyncHandler(async (req, res, next) => {
    const content = await Content.findOne({
        _id: req.params.id,
        isDeleted: false
    }).populate("categoryIds");

    if (!content) {
        const err = new Error("Content not found");
        err.code = 404;
        return next(err);
    }

    return res.status(200).json({ success: true, data: content });
});

export const updateContent = asyncHandler(async (req, res, next) => {
    const content = await Content.findOne({
        _id: req.params.id,
        isDeleted: false
    });

    if (!content) {
        const err = new Error("Content not found");
        err.code = 404;
        return next(err);
    }

       const { title, description, categoryIds, rentalPrice } = req.body;

    if (title) content.title = title;
    if (description) content.description = description;
    if (categoryIds) content.categoryIds = categoryIds;
    if (rentalPrice !== undefined) content.rentalPrice = rentalPrice;

    if (req.files?.poster?.[0]?.path) {
        const poster = await uploadOnCloudinary(req.files.poster[0].path, "content/posters");

        if (content.poster?.public_id) {
            await cloudinary.uploader.destroy(content.poster.public_id);
        }

        content.poster = { url: poster.url, public_id: poster.public_id };
    }

    if (req.files?.trailer?.[0]?.path) {
        const trailer = await uploadOnCloudinary(req.files.trailer[0].path, "content/trailers");

        if (content.trailer?.public_id) {
            await cloudinary.uploader.destroy(content.trailer.public_id);
        }

        content.trailer = { url: trailer.url, public_id: trailer.public_id };
    }
    await content.save();

    res.json({ success: true, message: "Content updated", data: content });
});

export const deleteContent = asyncHandler(async (req, res,next) => {
   const content = await Content.findById(req.params.id);

    if (!content) {
        const err = new Error("Content not found");
        err.code = 404;
        return next(err);
    }

    content.isDeleted = true;
    content.deletedAt = new Date();
    await content.save();
    return res.json({ success: true, message: "Content deleted" });
});

export const restoreContent = asyncHandler(async (req, res,next) => {
    const content = await Content.findById(req.params.id);
    if (!content) {
        const err = new Error("Content not found");
        err.code = 404;
        return next(err);
    }

    content.isDeleted = false;
    content.deletedAt = null;
    await content.save();
    return res.json({ success: true, message: "Content restored", data: content });
});
