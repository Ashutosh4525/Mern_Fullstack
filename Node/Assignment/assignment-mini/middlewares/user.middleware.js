import {params, body} from "express-validator";

export const validateCreateUser=[
    body("firstname")
    .trim()
    .length({min: 3}).withMessage("Length should be greater than 3"),

    body("lastname")
    .trim()
    .length({min: 3}).withMessage("Length should be greater than 3"),

    body("email")
    .trim()
    .isLowercase()
    .isEmail().withMessage("Enter proper Email")
    .length({min: 10}).withMessage("Length should be greater than 3"),

    body("password")
    .trim()
    .length({min: 6}).withMessage("Length should be greater than 6"),
]

export const validateUpdateUser=[
    params("id")
     .notEmpty().withMessage("ID is required")
     .isMongoId().withMessage("Invalid ID format")
]

export const signUpValidator = [
    body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(), 
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("firstname")
        .notEmpty().withMessage("First name is required")
        .trim().escape() 
];

export const loginValidator = [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required")
];


