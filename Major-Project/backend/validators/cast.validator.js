import { body, param, query } from 'express-validator';

export const castValidator = {
    
    idParam: [
        param('id').isMongoId().withMessage('Invalid Cast ID format')
    ],

    
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
        body('bio')
            .optional()
            .trim()
            .isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters')
    ],

    
    update: [
        param('id').isMongoId().withMessage('Invalid Cast ID format'),
        body('name')
            .optional()
            .trim()
            .notEmpty().withMessage('Name cannot be empty if provided')
            .isLength({ min: 2, max: 100 }),
        body('bio')
            .optional()
            .trim()
            .isLength({ max: 1000 })
    ],

    
    getAll: [
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100')
    ]
};
