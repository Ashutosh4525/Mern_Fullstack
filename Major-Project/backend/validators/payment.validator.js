import { body } from 'express-validator';

export const paymentValidator = {
    createOrder: [
        body('contentId')
            .notEmpty().withMessage('Content ID is required')
            .isMongoId().withMessage('Invalid Content ID format')
    ],

    verifyPayment: [
        body('razorpay_order_id')
            .notEmpty().withMessage('Order ID is required'),
        body('razorpay_payment_id')
            .notEmpty().withMessage('Payment ID is required'),
        body('razorpay_signature')
            .notEmpty().withMessage('Signature is required'),
        body('paymentId')
            .notEmpty().withMessage('Internal Payment ID is required')
            .isMongoId().withMessage('Invalid Payment ID format')
    ]
};
