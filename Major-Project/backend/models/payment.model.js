import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rentalId: {
    type: Schema.Types.ObjectId,
    ref: "Rental", 
    // required: true
  },
  // movieId:{
  //   type:Schema.Types.ObjectId,
  //   ref:"Movie",
  //   required:true
  // },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency:{
    type:String,
    default:"INR"
  },
  status: {
    type: String,
    enum: ["created","pending", "completed", "failed", "refunded"],
    default: "created"
  },
  paymentGateway:{
    type:String,
    default:"razorpay"
  },

  razorpayOrderId:{
    type:String,
    required:true
  },

  razorpayPaymentId:{
    type:String
  },

  razorpaySignature:{
    type:String
  },
  paymentMethod: {
    type: String,
    enum: ["card", "wallet"],
    // required: true
  },
  transactionId: {
    type: String, 
    unique: true,
    sparse: true 
  },
}, { timestamps: true });

paymentSchema.index({ userId: 1 })
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
