import {body, param} from 'express-validator'

export const userValidator ={

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
        body("email")
            .trim()
            .isLowercase()
            .isEmail().withMessage("Enter proper Email"),
        body("password")
            .trim()
            .isLength({min: 6}).withMessage("Length should be greater than 6"),
    ],
    login:[
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required")
    ],
    sendotp:[
         body("email").isEmail().withMessage("Enter a valid email"), 
    ],
    verifyotp:[
         body("email").isEmail().withMessage("Enter a valid email"), 
         body("otp")
         .trim()
         .notEmpty().withMessage("otp is required")
         .isLength({min: 6, max:6}).withMessage("OTP must be 6 characters")
    ],
    resetPassword: [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("otp")
         .trim()
         .notEmpty().withMessage("OTP is required")
         .isLength({min: 6, max:6}).withMessage("OTP must be 6 characters"),
        body("newPassword").trim().isLength({min: 6}).withMessage("Password must be at least 6 characters")
    ],
    updateProfile: [
        body('firstname').optional().trim().notEmpty(),
        body('lastname').optional().trim().notEmpty(),
        body('avatar.url').optional().isURL().withMessage('Invalid avatar URL'),
    ],
    verifyOtpChangePassword: [
        body("otp").trim().notEmpty().withMessage("OTP is required").isLength({min: 6, max:6}).withMessage("OTP must be 6 characters"),
        body("newPassword").trim().isLength({min: 6}).withMessage("Password must be at least 6 characters")
    ]
}
