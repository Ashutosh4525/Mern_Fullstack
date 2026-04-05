import { body, param } from 'express-validator';

export const movieCastValidator = {
    create: [
        body('contentId')
            .notEmpty().withMessage('Content ID is required')
            .isMongoId().withMessage('Invalid Content ID format'),
        body('castID')
            .notEmpty().withMessage('Cast ID is required')
            .isMongoId().withMessage('Invalid Cast ID format'),
        body('role')
            .optional()
            .isLength({ min: 1, max: 120 }).withMessage('Role must be 1-120 characters')
    ],

    getByMovie: [
        param('movieId')
            .isMongoId().withMessage('Invalid Content ID format')
    ],

    delete: [
        param('id')
            .isMongoId().withMessage('Invalid Relationship ID format')
    ]
};
