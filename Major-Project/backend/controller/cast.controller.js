import Cast from "../models/cast.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

export const createCast = asyncHandler(async (req, res, next) => {
    const { name, bio } = req.body;

    if (!name || name.trim() === "") {
        const error = new Error("Name is required");
        error.code = 400;
        return next(error);
    }

    const profileImageLocalPath = req.file?.path;
    if (!profileImageLocalPath) {
        const error = new Error("Profile image is required");
        error.code = 400;
        return next(error);
    }

    
    const profileImage = await uploadOnCloudinary(profileImageLocalPath, "casts");

    if (!profileImage) {
        const error = new Error("Error while uploading profile image");
        error.code = 400;
        return next(error);
    }

    const cast = await Cast.create({
        name,
        bio,
        profileImage: {
        url: profileImage.url,
        public_id: profileImage.public_id
        }
    });

    return res.status(201).json({
        success: true,
        data: cast,
        message: "Cast member created successfully"
    });
});


export const getAllCast = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit
    const casts = await Cast.find({ isDeleted: false }).skip(skip).limit(limit);
    return res.status(200).json({
        success: true,
        page,
        limit,
        data: casts
    });
});

// Get all cast including deleted (admin only)
export const getAllCastIncludingDeleted = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [casts, total] = await Promise.all([
        Cast.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }),
        Cast.countDocuments({})
    ]);

    return res.status(200).json({
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: casts
    });
});

export const getCastById = asyncHandler(async (req, res, next) => {
    const cast = await Cast.findById(req.params.id);
    if (!cast) {
        const error = new Error("Cast member not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: cast
    });
});

export const updateCast = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const cast = await Cast.findOne({_id:id,isDeleted:false});

    if (!cast) {
        const error = new Error("Cast member not found");
        error.code = 404;
        return next(error);
    }

    let profileImageUrl = cast.profileImage;
    const newImageLocalPath = req.file?.path;

    if (newImageLocalPath) {
        const uploadedImage = await uploadOnCloudinary(newImageLocalPath, "casts");
        
        
        if (cast.profileImage) {
            // const oldPublicId = cast.profileImage.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(cast.profileImage.public_id);
        }
        profileImageUrl = {
            url: uploadedImage.url,
            public_id: uploadedImage.public_id
        }
    }

    const updatedCast = await Cast.findByIdAndUpdate(
        id,
        {
            $set: {
                name: req.body.name || cast.name,
                bio: req.body.bio || cast.bio,
                profileImage: profileImageUrl
            }
        },
        { new: true, runValidators: true }
    );

    return res.status(200).json({
        success: true,
        data: updatedCast,
        message: "Cast updated successfully"
    });
});


export const deleteCast = asyncHandler(async (req, res, next) => {
    const cast = await Cast.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
    );

    if (!cast) {
        const error = new Error("Cast member not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Cast moved to trash"
    });
});

export const restoreCast = asyncHandler(async (req, res, next) => {
    const cast = await Cast.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: false, deletedAt: null } },
        { new: true }
    );

    if (!cast) {
        const error = new Error("Cast member not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: cast,
        message: "Cast member restored successfully"
    });
});

