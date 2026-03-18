import express from "express"
import { createOrder, verifyPayment,razorpayWebhook } from "../controller/payment.controller.js"
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js"
import { paymentValidator } from "../validators/payment.validator.js"
const paymentRouter = express.Router()

paymentRouter.post("/order", paymentValidator.createOrder,Authverify, createOrder)
paymentRouter.post("/verify",paymentValidator.verifyPayment, Authverify, verifyPayment)
// paymentRouter.post("/razorpay/webhook", razorpayWebhook);

export default paymentRouter