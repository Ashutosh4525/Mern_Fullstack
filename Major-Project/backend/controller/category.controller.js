import Category from "../models/category.model.js";
import { asyncHandler } from "../middlewares/err.middleware.js";

// Create a new Category
export const createCategory = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
        const error = new Error("Category name is required");
        error.code = 400;
        return next(error);
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        const error = new Error("Category already exists");
        error.code = 409;
        return next(error);
    }

    const category = await Category.create({ name, description });

    return res.status(201).json({
        success: true,
        data: category,
        message: "Category created successfully"
    });
});

// Get all Categories
export const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({ isDeleted: false }).sort({ name: 1 });

    return res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// Update Category
export const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: { name, description } },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        const error = new Error("Category not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: updatedCategory,
        message: "Category updated successfully"
    });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { 
            $set: { 
                isDeleted: true, 
                deletedAt: new Date() // Sets timestamp for TTL index
            } 
        },
        { new: true }
    );

    if (!category) {
        const error = new Error("Category not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Category moved to trash (auto-deletes in 30 days)"
    });
});

// 3. Restore Category (Optional but useful)
export const restoreCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: false, deletedAt: null } },
        { new: true }
    );

    if (!category) {
        const error = new Error("Category not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: category,
        message: "Category restored successfully"
    });
});