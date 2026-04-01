import { body, param } from 'express-validator';

export const seasonValidator = {
    idParam: [
        param('id')
            .isMongoId()
            .withMessage('Valid MongoDB ID required')
    ],
    create: [
        body('contentId')
            .notEmpty()
            .withMessage('Content ID is required')
            .isMongoId()
            .withMessage('Content ID must be a valid MongoDB ID'),
        body('seasonNumber')
            .notEmpty()
            .withMessage('Season number is required')
            .isInt({ min: 1 })
            .withMessage('Season number must be a positive integer')
    ],
    update: [
        body('contentId')
            .optional()
            .isMongoId()
            .withMessage('Content ID must be a valid MongoDB ID'),
        body('seasonNumber')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Season number must be a positive integer')
    ]
};
