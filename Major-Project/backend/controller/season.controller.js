import Season from "../models/season.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";
import Content from "../models/content.model.js";
export const createSeason = asyncHandler(async (req, res,next) => {
    const { contentId, seasonNumber } = req.body;

    if (!contentId || seasonNumber === undefined) {
        const error = new Error("Required fields missing");
        error.code = 404;
        return next(error);
    }

    const content = await Content.findById(contentId);
    if (!content || content.type !== "tv") {
        const error = new Error("Invalid TV content");
        error.code = 400;
        return next(error);
    }

    const exists = await Season.findOne({ contentId, seasonNumber });
    if (exists) {
        const error = new Error("Season already exists");
        error.code = 409;
        return next(error);
    }
    const season = await Season.create({
        contentId,
        seasonNumber
    });

    return res.status(201).json({ success: true, message: "Season created", data: season });
});

export const getSeasonsByContent = asyncHandler(async (req, res, next) => {
    const { contentId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [seasons, total] = await Promise.all([
        Season.find({ contentId, isDeleted: false })
            .sort({ seasonNumber: 1 })
            .skip(skip)
            .limit(limit),
        Season.countDocuments({ contentId, isDeleted: false })
    ]);

    return res.json({
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: seasons
    });
});

export const getSeasonById = asyncHandler(async (req, res, next) => {
    const season = await Season.findOne({
        _id: req.params.id,
        isDeleted: false
    });

    if (!season) {
        const error = new Error("Season not found");
        error.code = 404;
        return next(error);
    }

    return res.json({
        success: true,
        data: season
    });
});

export const updateSeason = asyncHandler(async (req, res, next) => {
    const season = await Season.findById(req.params.id);

    if (!season || season.isDeleted) {
        const error = new Error("Season not found");
        error.code = 404;
        return next(error);
    }

    if (req.body.seasonNumber !== undefined) {
        season.seasonNumber = req.body.seasonNumber;
    }

    await season.save();

    return res.json({
        success: true,
        message: "Season updated",
        data: season
    });
});

export const deleteSeason = asyncHandler(async (req, res, next) => {
    const season = await Season.findById(req.params.id);

    if (!season) {
        const error = new Error("Season not found");
        error.code = 404;
        return next(error);
    }

    season.isDeleted = true;
    season.deletedAt = new Date();
    await season.save();

    return res.json({
        success: true,
        message: "Season deleted"
    });
});

export const restoreSeason = asyncHandler(async (req, res, next) => {
    const season = await Season.findById(req.params.id);

    if (!season) {
        const error = new Error("Season not found");
        error.code = 404;
        return next(error);
    }

    if (!season.isDeleted) {
        const error = new Error("Season is deleted");
        error.code = 400;
        return next(error);
    }

    season.isDeleted = false;
    season.deletedAt = null;
    await season.save();

    return res.json({
        success: true,
        message: "Season restored",
        data: season
    });
});