import express from "express"
import {
 createRental,
 getUserRentals,
 expireRental
} from "../controller/rental.controller.js"
import { 
    Authverify ,
    verifyAdmin
} from "../middlewares/auth.middleware.js"
import { rentalValidator } from "../validators/rental.validator.js"


const rentalRouter = express.Router()

rentalRouter.post("/",rentalValidator.create,Authverify, createRental)

rentalRouter.get("/user/:userId",rentalValidator.userParams,Authverify, getUserRentals)

rentalRouter.patch("/expire/:id",rentalValidator.idParam,Authverify, expireRental)

export default rentalRouter