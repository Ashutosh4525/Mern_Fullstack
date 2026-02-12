import { body, param, query } from 'express-validator';

export const authorValidator = {

    search: [
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1-100'),
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be a positive integer'),
        query('search')
            .optional()
            .isLength({ min: 1, max: 100 })
            .withMessage('Search term must be 1-100 characters')
    ],

    
    idParam: [
        param('id')
            .isMongoId()
            .withMessage('Valid MongoDB ID required')
    ],

    
    create: [
        body('firstname')
            .notEmpty()
            .withMessage('First name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be 2-50 characters'),
        body('lastname')
            .notEmpty()
            .withMessage('Last name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be 2-50 characters'),
        body('bio')
            .optional()
            .isLength({ min: 10, max: 500 })
            .withMessage('Bio must be 10-500 characters'),
        body('birthDate')
            .notEmpty()
            .withMessage('Birth date is required')
            .isISO8601()
            .withMessage('Birth date must be valid ISO date')
            .custom((value) => {
                const birthDate = new Date(value);
                const now = new Date();
                const age = now.getFullYear() - birthDate.getFullYear();
                if (age < 0 || age > 120) {
                    throw new Error('Invalid birth date');
                }
                return true;
            }),
        body('avatar')
            .optional()
            .isURL()
            .withMessage('Avatar must be a valid URL')
    ],

    
    update: [
        param('id')
            .isMongoId()
            .withMessage('Valid MongoDB ID required'),
        body('firstname')
            .optional()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be 2-50 characters'),
        body('lastname')
            .optional()
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be 2-50 characters'),
        body('bio')
            .optional()
            .isLength({ min: 10, max: 500 })
            .withMessage('Bio must be 10-500 characters'),
        body('birthDate')
            .optional()
            .isISO8601()
            .withMessage('Birth date must be valid ISO date'),
        body('avatar')
            .optional()
            .isURL()
            .withMessage('Avatar must be a valid URL')
    ]
};
