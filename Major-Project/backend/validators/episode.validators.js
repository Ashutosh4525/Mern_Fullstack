import { body, param } from 'express-validator';

export const episodeValidator = {
    idParam: [
        param('id')
            .isMongoId()
            .withMessage('Valid MongoDB ID required')
    ],
    create: [
        body('seasonId')
            .notEmpty()
            .withMessage('Season ID is required')
            .isMongoId()
            .withMessage('Season ID must be a valid MongoDB ID'),
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 1, max: 200 })
            .withMessage('Title must be 1-200 characters'),
        body('episodeNumber')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Episode number must be a positive integer'),
        body('video.url')
            .optional()
            .isURL()
            .withMessage('Video URL must be a valid URL'),
        body('duration')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Duration must be a positive number')
    ],
    update: [
        body('seasonId')
            .optional()
            .isMongoId()
            .withMessage('Season ID must be a valid MongoDB ID'),
        body('title')
            .optional()
            .isLength({ min: 1, max: 200 })
            .withMessage('Title must be 1-200 characters'),
        body('episodeNumber')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Episode number must be a positive integer'),
        body('video.url')
            .optional()
            .isURL()
            .withMessage('Video URL must be a valid URL'),
        body('duration')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Duration must be a positive number')
    ]
};
