import { body, param } from 'express-validator';

export const rentalValidator = {
    create: [
        body('contentId')
            .notEmpty().withMessage('Content ID is required')
            .isMongoId().withMessage('Invalid Content ID format'),
        body('paymentId')
            .optional()
            .isMongoId().withMessage('Invalid Payment ID format')
    ],

    
    userParams: [
        param('userId')
            .isMongoId().withMessage('Invalid User ID format')
    ],

  
    idParam: [
        param('id')
            .isMongoId().withMessage('Invalid Rental ID format')
    ]
};
