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
    required: true
  },
  movieId:{
    type:Schema.Types.ObjectId,
    ref:"Movie",
    required:true
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
    required: true
  },
  transactionId: {
    type: String, 
    unique: true,
    sparse: true 
  },
  // isDeleted:{
  //       type:Boolean,
  //       default:false
  //   },
  //   deletedAt: {
  //       type: Date,
  //       default: null,
  //       index: { 
  //           expireAfterSeconds: 30 * 24 * 60 * 60,  
  //           partialFilterExpression: { isDeleted: true }  
  //       }
  //   },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
