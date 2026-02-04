import { body, param, validationResult } from "express-validator";

export const validateCreateBrand = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    
    body("status")
        .notEmpty().withMessage("Status is required")
        .isIn(["0", "1"]).withMessage("Status must be 0 or 1")
];

export const validateUpdateBrand = [
    param("id")
        .notEmpty().withMessage("ID is required")
        .isMongoId().withMessage("Invalid ID format"),
    
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    
    body("description")
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    
    body("status")
        .optional()
        .isIn(["0", "1"]).withMessage("Status must be 0 or 1")
];

export const validateDeleteBrand = [
    param("id")
        .notEmpty().withMessage("ID is required")
        .isMongoId().withMessage("Invalid ID format")
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
            success: false
        });
    }
    next();
};