import Rental from "../models/rental.model.js"
import { asyncHandler } from "../middlewares/err.middleware.js"

export const createRental = asyncHandler(async(req,res,next)=>{

    const {userId, movieId, paymentId} = req.body

    if(!userId || !movieId){
    return next(new Error("userId and movieId required"))
    }

    const expires = new Date()
    expires.setHours(expires.getHours()+48)

    const rental = await Rental.create({
    userId,
    movieId,
    paymentId,
    expiresAt:expires
    })

    res.status(201).json({
    success:true,
    data:rental
    })

})

export const getUserRentals = asyncHandler(async(req,res)=>{

    const rentals = await Rental.find({
    userId:req.params.userId
    })
    .populate("movieId")

    res.json({
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