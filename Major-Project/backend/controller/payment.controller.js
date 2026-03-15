import { razorpay } from "../config/razorpay.config.js"
import Payment from "../models/payment.model.js"
import crypto from "crypto"
import Movie from "../models/movie.model.js"
import Rental from "../models/rental.model.js"
import { asyncHandler } from "../middlewares/err.middleware.js"

export const createOrder = asyncHandler(async (req,res,next)=>{

 const { movieId } = req.body

 const movie = await Movie.findById(movieId)

 if(!movie){
  return next(new Error("Movie not found"))
 }

 const order = await razorpay.orders.create({
  amount: movie.rentalPrice * 100,
  currency: "INR",
  receipt: "order_" + Date.now()
 })

 const payment = await Payment.create({
  userId: req.user._id,
  movieId,
  amount: movie.rentalPrice,
  razorpayOrderId: order.id,
  status: "created"
 })

 res.json({
  success:true,
  order,
  paymentId: payment._id
 })

})


export const verifyPayment = asyncHandler(async (req,res,next)=>{

 const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  paymentId
 } = req.body

 const body = razorpay_order_id + "|" + razorpay_payment_id

 const expected = crypto
   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
   .update(body)
   .digest("hex")

 if(expected !== razorpay_signature){
  return next(new Error("Payment verification failed"))
 }

 const payment = await Payment.findById(paymentId)

 payment.status = "completed"
 payment.razorpayPaymentId = razorpay_payment_id
 payment.razorpaySignature = razorpay_signature

 await payment.save()

 const expires = new Date()
 expires.setHours(expires.getHours() + 48)

 const rental = await Rental.create({
  userId: payment.userId,
  movieId: payment.movieId,
  paymentId: payment._id,
  expiresAt: expires
 })

 res.json({
  success:true,
  message:"Payment successful",
  rental
 })

})