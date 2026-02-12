import { body, param, query } from "express-validator";

export const bookValidator = {
    
    create: [
        body("title")
            .notEmpty().withMessage("Title is required")
            .trim()
            .isLength({ min: 2 }).withMessage("Title must be at least 2 characters"),
        
        body("authorID")
            .notEmpty().withMessage("Author ID is required")
            .isMongoId().withMessage("Invalid Author ID format"),
        
        body("publishedDate")
            .notEmpty().withMessage("Published date is required")
            .isISO8601().withMessage("Must be a valid date (YYYY-MM-DD)"),
        
        body("coverImage")
            .optional()
            .isURL().withMessage("Cover image must be a valid URL")
    ],

    
    update: [
        param("id").isMongoId().withMessage("Invalid Book ID"),
        body("title").optional().trim().isLength({ min: 2 }),
        body("authorID").optional().isMongoId(),
        body("publishedDate").optional().isISO8601(),
    ],

    
    idParam: [
        param("id").isMongoId().withMessage("The provided ID is not a valid MongoDB ID")
    ],


    search: [
        query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
        query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
        query("search").optional().trim().escape()
    ]
};