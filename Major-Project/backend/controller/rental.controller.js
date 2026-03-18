import Rental from "../models/rental.model.js"
import { asyncHandler } from "../middlewares/err.middleware.js"

export const createRental = asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;
    const { movieId, paymentId} = req.body

    if(!userId || !movieId){
    // return next(new Error("userId and movieId required"))
        const error = new Error("userId and movieId required");
        error.code = 400;
        return next(error);
    }

    const expires = new Date()
    expires.setHours(expires.getHours()+48)

    const existingRental = await Rental.findOne({
    userId,
    movieId,
    status: "active",
    expiresAt: { $gt: new Date() }
    })
    if(existingRental){
        const error = new Error("This movie is already rented and active");
        error.code = 400;
        return next(error);
    }

    const rental = await Rental.create({
    userId,
    movieId,
    paymentId,
    expiresAt:expires
    })

    return res.status(201).json({
        success:true,
        data:rental,
        message: "Rental created successfully"
    })

})

export const getUserRentals = asyncHandler(async(req,res)=>{
    const userId = req.params.userId;

    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
        const error = new Error("Unauthorized access to these rentals");
        error.code = 403;
        return next(error);
    }
    const rentals = await Rental.find({ userId })
    .populate("movieId")
    .sort({ createdAt: -1 });

    return res.status(200).json({
        success:true,
        data:rentals
    })

})

export const expireRental = asyncHandler(async(req,res)=>{

    const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {status:"expired"},
    {new:true}
    )

    res.json({
    success:true,
    data:rental
    })

})