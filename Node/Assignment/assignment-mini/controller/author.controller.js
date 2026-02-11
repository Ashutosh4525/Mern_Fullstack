import Author from "../model/author.model";
import { asyncHandler } from "../middlewares/error.middleware";
import Book from "../model/book.model";

export const createAuthor = asyncHandler(async(req,res,next)=>{
    const {firstname,lastname,bio,birthDate}=req.body;

    // if(firstname&&lastname&&bio&&birthDate){
    //     const error=new Error("This author already exists");
    //     error.code=401
    //     next(error)
    // }
    const newAuthor= await Author.create({firstname,lastname,bio,birthDate});

    return res.status(201).json({
            data:newAuthor,
            message:"All Good",
            success:true
        })
})

export const getAllAuthor=asyncHandler(async (req,res,next) => {
    const author= await Author.find({isDeleted:false});

    if (!author){
        const error= new Error ("No Author Found")
        error.code=404;
        next(error)
    }
     return res.status(200).json({
            data:book,
            message:"Author",
            success:true
        })
})


export const getSingleAuthor= asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    const author = Author.findOne({_id:id},{isDeleted:false});

    if (!author) {
        const error= new Error("author not found");
        error.code=404;
        return next(error)
    }

    const book= Book.find({
        author:author._id,
        isDeleted:false
    })

    return res.status(200).json({
        data:book,
        success:true,
        message:"All data"
    })
})

export const updateAuthor= asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    const author=await Author.findById({_id:id},{isDeleted:false})

    if (!author) {
        const error = new Error("Author not found");
        error.code = 404;
        return next(error);
    }

    const {firstname,lastname,bio,birthDate}=req.body;

    const newAuthor= await Author.updateOne({_id:id},{isDeleted:false},{
        firstname, 
        lastname,
        bio,
        birthDate
    })

    return res.status(200).json({
            success: true,
            data: await Author.findById(id),
            message:"Updated data"
        });
})

export const softDeleteAuthor = asyncHandler(async (req, res, next) => {
    // const {email} = req.body;
    // const user = await User.findOne({email})

    const {id}=req.params;

    const user = await Author.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            deletedAt: new Date() 
        },
        { new: true, runValidators: true }
    );

    if (!user) {
        const error = new Error("Author not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Author deactivated. It will be permanently deleted in 30 days."
    });
})

export const restoreUser = asyncHandler(async (req, res, next) => {
    const { id } = req.body;

    const user = await Author.findOneAndUpdate(
        { _id:id, isDeleted: true }, 
        { 
            isDeleted: false, 
            deletedAt: null 
        },
        { new: true } 
    );

    if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }

        return res.status(200).json({
            success: true,
            message: "Author restored successfully!",
            data: user
        });
})