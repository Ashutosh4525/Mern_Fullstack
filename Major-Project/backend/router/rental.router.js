


import express from "express"
import {
 createRental,
 getUserRentals,
 expireRental
} from "../controllers/rental.controller.js"

const router = express.Router()

router.post("/", createRental)

router.get("/user/:userId", getUserRentals)

router.patch("/expire/:id", expireRental)

export default router