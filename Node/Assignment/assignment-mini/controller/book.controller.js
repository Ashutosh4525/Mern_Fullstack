import Book from "../model/book.model";
import { asyncHandler } from "../middlewares/error.middleware";

export const createBook = asyncHandler(async(req,res,next)=>{
    const {title,coverImage,authorID,publishedDate}=req.body;

    const newBook= await Book.create({title,coverImage,authorID,publishedDate});

    return res.status(201).json({
            data:newBook,
            message:"All Good",
            success:true
        })
})

export const getAllBook=asyncHandler(async (req,res,next) => {
    const book= await Book.find({isDeleted:false});

    if (!author){
        const error= new Error ("No Book Found")
        error.code=404;
        next(error)
    }
     return res.status(200).json({
            data:book,
            message:"Book",
            success:true
        })
})


export const getSingleBook= asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    const author = Book.findOne({_id:id},{isDeleted:false});

    if (!author) {
        const error= new Error("book not found");
        error.code=404;
        return next(error)
    }

    // const book= Book.find({
    //     author:author._id,
    //     isDeleted:false
    // })

    return res.status(200).json({
        data:author,
        success:true,
        message:"All data"
    })
})

export const updateBook= asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    const author=await Book.findById({_id:id},{isDeleted:false})

    if (!author) {
        const error = new Error("Book not found");
        error.code = 404;
        return next(error);
    }

    const {title,coverImage,authorID,publishedDate}=req.body;

    const newBook= await Book.updateOne({_id:id},{isDeleted:false},{
        title,coverImage,authorID,publishedDate
    })

    return res.status(200).json({
            success: true,
            data: await Book.findById(id),
            message:"Updated data"
        });
})

export const softDeleteBook = asyncHandler(async (req, res, next) => {
    // const {email} = req.body;
    // const book = await User.findOne({email})

    const {id}=req.params;

    const book = await Book.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            deletedAt: new Date() 
        },
        { new: true, runValidators: true }
    );

    if (!book) {
        const error = new Error("Book not found");
        error.code = 404;
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Book deactivated. It will be permanently deleted in 30 days."
    });
})

export const restoreUser = asyncHandler(async (req, res, next) => {
    const { id } = req.body;

    const book = await Book.findOneAndUpdate(
        { _id:id, isDeleted: true }, 
        { 
            isDeleted: false, 
            deletedAt: null 
        },
        { new: true } 
    );

    if (!book) {
        const error = new Error("User not found");
        error.code = 404;
        return next(error);
    }
        return res.status(200).json({
            success: true,
            message: "Book restored successfully!",
            data: book
        });
})