import Rental from "../models/rental.model.js"
import { asyncHandler } from "../middlewares/err.middleware.js"

export const createRental = asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;
    const { contentId, paymentId} = req.body

    if(!userId || !contentId){
    // return next(new Error("userId and movieId required"))
        const error = new Error("userId and contentId required");
        error.code = 400;
        return next(error);
    }

    const expires = new Date()
    expires.setHours(expires.getHours()+48)

    const existingRental = await Rental.findOne({
    userId,
    contentId,
    expiresAt: { $gt: new Date() }
    })
    if(existingRental){
        const error = new Error("This content is already rented and active");
        error.code = 400;
        return next(error);
    }

    const rental = await Rental.create({
    userId,
    contentId,
    paymentId,
    expiresAt:expires
    })

    return res.status(201).json({
        success:true,
        data:rental,
        message: "Rental created successfully"
    })

})

export const getUserRentals = asyncHandler(async(req,res,next)=>{
    const userId = req.params.userId;

    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
        const error = new Error("Unauthorized access to these rentals");
        error.code = 403;
        return next(error);
    }
    const rentals = await Rental.find({ userId })
    .populate("contentId")
    .sort({ createdAt: -1 });

    return res.status(200).json({
        success:true,
        data:rentals
    })

})

export const getAllRentals = asyncHandler(async (req, res) => {
    const rentals = await Rental.find({})
        .populate("contentId")
        .populate("userId", "firstname lastname email role")
        .populate("paymentId")
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        data: rentals
    });
})

export const expireRental = asyncHandler(async(req,res,next)=>{

    const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {expiresAt: new Date()},
    {new:true}
    )

    if (!rental) {
        const error = new Error("Rental not found");
        error.code = 404;
        return next(error);
    }

    res.json({
    success:true,
    data:rental
    })

})
