import { body, param } from 'express-validator';

export const categoryValidator = {
    
    idParam: [
        param('id').isMongoId().withMessage('Invalid Category ID format')
    ],

    
    create: [
        body('name')
            .trim()
            .notEmpty().withMessage('Category name is required')
            .isLength({ min: 2, max: 30 }).withMessage('Name must be 2-30 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters')
    ],

    
    update: [
        param('id').isMongoId().withMessage('Invalid Category ID format'),
        body('name')
            .optional()
            .trim()
            .notEmpty().withMessage('Name cannot be empty')
            .isLength({ min: 2, max: 30 }),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 200 })
    ]
};
