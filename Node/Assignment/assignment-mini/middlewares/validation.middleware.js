import {params, body, validationResult} from "express-validator";

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

const validateUpdateUser=[
    params("id")
     .notEmpty().withMessage("ID is required")
     .isMongoId().withMessage("Invalid ID format")
]