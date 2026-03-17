import { body, param } from 'express-validator';

export const rentalValidator = {
    create: [
        body('movieId')
            .notEmpty().withMessage('Movie ID is required')
            .isMongoId().withMessage('Invalid Movie ID format'),
        body('paymentId')
            .notEmpty().withMessage('Payment ID is required')
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
