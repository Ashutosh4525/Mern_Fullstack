import { body, param, query } from 'express-validator';

export const movieValidator = {
    idParam: [
        param('id').isMongoId().withMessage('Invalid Movie ID format')
    ],

    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ max: 200 }).withMessage('Title too long'),
        body('description')
            .trim()
            .notEmpty().withMessage('Description is required'),
        body('categoryID')
            .isMongoId().withMessage('Valid Category ID is required'),
        body('rentalPrice')
            .isFloat({ min: 0 }).withMessage('Rental price must be a positive number'),
        body('duration')
            .isInt({ min: 1 }).withMessage('Duration must be at least 1 minute')
    ],

    update: [
        param('id').isMongoId().withMessage('Invalid Movie ID format'),
        body('title').optional().trim().notEmpty(),
        body('description').optional().trim().notEmpty(),
        body('categoryID').optional().isMongoId().withMessage('Invalid Category ID'),
        body('rentalPrice').optional().isFloat({ min: 0 }),
        body('duration').optional().isInt({ min: 1 })
    ],

    pagination: [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 50 })
    ]
};
