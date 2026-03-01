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
  }
}, { timestamps: true }); 

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental;
