import express from "express"
import {
 createRental,
 getUserRentals,
 getAllRentals,
 expireRental
} from "../controller/rental.controller.js"
import { 
    Authverify ,
    verifyAdmin
} from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { rentalValidator } from "../validators/rental.validator.js"


const rentalRouter = express.Router()

rentalRouter.post("/",rentalValidator.create,validate,Authverify, createRental)
rentalRouter.get("/all",Authverify,verifyAdmin,getAllRentals)

rentalRouter.get("/user/:userId",rentalValidator.userParams,validate,Authverify, getUserRentals)

rentalRouter.patch("/expire/:id",rentalValidator.idParam,validate,Authverify,verifyAdmin, expireRental)

export default rentalRouter
