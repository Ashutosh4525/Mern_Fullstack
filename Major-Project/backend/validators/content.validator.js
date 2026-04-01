import { body, param } from 'express-validator';

export const contentValidator = {
    idParam: [
        param('id')
            .isMongoId()
            .withMessage('Valid MongoDB ID required')
    ],
    create: [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 1, max: 200 })
            .withMessage('Title must be 1-200 characters'),
        body('description')
            .optional()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        body('type')
            .notEmpty()
            .withMessage('Type is required')
            .isIn(['movie', 'tv'])
            .withMessage('Type must be either movie or tv'),
        body('categoryIds')
            .optional()
            .isArray()
            .withMessage('Category IDs must be an array'),
        body('categoryIds.*')
            .optional()
            .isMongoId()
            .withMessage('Each category ID must be a valid MongoDB ID'),
        body('poster.url')
            .optional()
            .isURL()
            .withMessage('Poster URL must be a valid URL'),
        body('releaseDate')
            .optional()
            .isISO8601()
            .withMessage('Release date must be a valid date'),
        body('trailer.url')
            .optional()
            .isURL()
            .withMessage('Trailer URL must be a valid URL'),
        body('rentalPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Rental price must be a positive number')
    ],
    update: [
        body('title')
            .optional()
            .isLength({ min: 1, max: 200 })
            .withMessage('Title must be 1-200 characters'),
        body('description')
            .optional()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        body('type')
            .optional()
            .isIn(['movie', 'tv'])
            .withMessage('Type must be either movie or tv'),
        body('categoryIds')
            .optional()
            .isArray()
            .withMessage('Category IDs must be an array'),
        body('categoryIds.*')
            .optional()
            .isMongoId()
            .withMessage('Each category ID must be a valid MongoDB ID'),
        body('poster.url')
            .optional()
            .isURL()
            .withMessage('Poster URL must be a valid URL'),
        body('releaseDate')
            .optional()
            .isISO8601()
            .withMessage('Release date must be a valid date'),
        body('trailer.url')
            .optional()
            .isURL()
            .withMessage('Trailer URL must be a valid URL'),
        body('rentalPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Rental price must be a positive number')
    ]
};
