import mongoose, { Schema } from "mongoose";

const rentalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie", 
    required: true
  },
  paymentId: {
    type: String, 
    required: true
  },
  rentedAt: {
    type: Date,
    default: Date.now 
  },
  expiresAt: {
    type: Date,
    required: true 
  },
  status: {
    type: String,
    enum: ["active", "expired"], 
    default: "active"
  },
  isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null,
        index: { 
            expireAfterSeconds: 30 * 24 * 60 * 60,  
            partialFilterExpression: { isDeleted: true }  
        }
    },
}, { timestamps: true }); 

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental;
