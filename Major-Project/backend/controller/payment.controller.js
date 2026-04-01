import { razorpay } from "../config/razorpay.config.js"
import Payment from "../models/payment.model.js"
import crypto from "crypto"
import Movie from "../models/movie.model.js"
import Rental from "../models/rental.model.js"
import { asyncHandler } from "../middlewares/err.middleware.js"
import mongoose from "mongoose";
import Content from "../models/content.model.js"

export const createOrder = asyncHandler(async (req,res,next)=>{

 const { contentId } = req.body

 const content = await Content.findById(contentId)

 if(!content){
    const error = new Error("Content not found");
    error.code = 404;
    return next(error);
 }

 const order = await razorpay.orders.create({
  amount: content.rentalPrice * 100,
  currency: "INR",
  receipt: "order_" + Date.now()
 })

 const payment = await Payment.create({
  userId: req.user._id,
  contentId,
  amount: content.rentalPrice,
  razorpayOrderId: order.id,
  status: "created"
 })

 return res.status(200).json({
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

 const razorpaySecret =
   process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

 if (!razorpaySecret) {
        const error = new Error("Razorpay secret key is not configured");
        error.code = 500;
        return next(error);
 }

 const expected = crypto
   .createHmac("sha256", razorpaySecret)
   .update(body)
   .digest("hex")

 if(expected !== razorpay_signature){
        const error = new Error("Payment verification failed: Invalid signature");
        error.code = 400;
        return next(error);
 }

    const session = await mongoose.startSession();
    session.startTransaction();

     try {
        const payment = await Payment.findById(paymentId).session(session);

        if (!payment) {
            const error = new Error("Payment record not found");
            error.code = 404;
            throw error; 
        }

        if (payment.status === "completed") {
            const error = new Error("This payment has already been processed");
            error.code = 400;
            throw error;
        }

        const order = await razorpay.orders.fetch(razorpay_order_id);

        if (order.amount !== payment.amount * 100) {
          const error = new Error("Amount mismatch detected");
          error.code = 400;
          throw error;
        }

        const existingRental = await Rental.findOne({
          userId: payment.userId,
          contentId: payment.contentId,
          // status: "active",
          expiresAt: { $gt: new Date() },
        }).session(session);

        if (existingRental) {
          const error = new Error("Movie already rented");
          error.code = 400;
          throw error;
        }

        payment.status = "completed";
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        await payment.save({ session });

        
        const expires = new Date();
        expires.setHours(expires.getHours() + 48); 

        const rental = await Rental.create([{
            userId: payment.userId,
            contentId: payment.contentId,
            paymentId: payment._id,
            expiresAt: expires,
            // status: "active"
        }], { session });

        
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: "Payment verified and rental activated successfully",
            data: rental[0]
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        if (!error.code) error.code = 500;
        return next(error);
    }
});


export const razorpayWebhook = asyncHandler(async (req, res, next) => {
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).send("Invalid webhook signature");
  }

  const event = req.body.event;

  if (event === "payment.captured") {
    const paymentData = req.body.payload.payment.entity;

    const payment = await Payment.findOne({
      razorpayOrderId: paymentData.order_id,
    });

    if (!payment || payment.status === "completed") {
      return res.json({ success: true });
    }

    payment.status = "completed";
    payment.razorpayPaymentId = paymentData.id;
    await payment.save();

    const expires = new Date();
    expires.setHours(expires.getHours() + 48);

    await Rental.create({
      userId: payment.userId,
      contentId: payment.contentId,
      paymentId: payment._id,
      expiresAt: expires,
      // status: "active",
    });
  }

  return res.json({ received: true });
});
