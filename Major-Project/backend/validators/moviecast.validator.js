import { body, param } from 'express-validator';

export const movieCastValidator = {
    create: [
        body('movieID')
            .notEmpty().withMessage('Movie ID is required')
            .isMongoId().withMessage('Invalid Movie ID format'),
        body('castID')
            .notEmpty().withMessage('Cast ID is required')
            .isMongoId().withMessage('Invalid Cast ID format')
    ],

    getByMovie: [
        param('movieId')
            .isMongoId().withMessage('Invalid Movie ID format')
    ],

    delete: [
        param('id')
            .isMongoId().withMessage('Invalid Relationship ID format')
    ]
};
