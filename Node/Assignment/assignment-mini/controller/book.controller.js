import Book from "../model/book.model";
import Author from "../model/author.model";
import { asyncHandler } from "../middlewares/error.middleware";
import { processImageUpload, replaceImage } from "../utils/imageUpload";

export const createBook = asyncHandler(async(req,res,next)=>{
    const {title,authorID,publishedDate,coverImage}=req.body;

    let coverImageData;
    if (req.file) {
        coverImageData = await processImageUpload(req, 'coverImage');
    } else if (coverImage) {
        coverImageData = { cloudinary: { url: coverImage } };
    } else {
        coverImageData = null;
    }

    const newBook= await Book.create({title,
        coverImage:coverImageData,
        authorID,
        publishedDate});
    
    const populatedBook = await Book.findById(newBook._id).populate("authorID", "firstname lastname avatar");

    return res.status(201).json({
            data:populatedBook,
            message:"All Good",
            success:true
        })
})

export const getAllBook=asyncHandler(async (req,res,next) => {

    const { limit = 10, page = 1, search, sort, authorID, categoryId } = req.query;

    const skipval = Number(limit) * (Number(page) - 1);
    let filter = { isDeleted: false };

    if (search) {
        const searchRegex = new RegExp(`.*${search}.*`, 'i');

        const matchingAuthors = await Author.find({ 
            $or: [{ firstname: searchRegex }, { lastname: searchRegex }] 
        }).select("_id");

        filter = {
            ...filter,
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { authorID: { $in: matchingAuthors.map(a => a._id) } }
            ]
        };
    }
    
    if (authorID) filter.authorID = authorID;
    if (categoryId) filter.categoryId = categoryId;

    let sortValue = { createdAt: -1 }; 
    if (sort === 'newest') sortValue = { publishedDate: -1 };
    if (sort === 'oldest') sortValue = { publishedDate: 1 };
    if (sort === 'az') sortValue = { title: 1 };

    const book= await Book.find(filter)
        .populate("authorID", "firstname lastname avatar")
        .limit(Number(limit))
        .skip(skipval)
        .sort(sortValue);

    if (!book || book.length ===0){
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

    const book = await Book.findOne({_id:id},{isDeleted:false})
    .populate("authorID");

    if (!book) {
        const error= new Error("book not found");
        error.code=404;
        return next(error)
    }

    return res.status(200).json({
        data:book,
        success:true,
        message:"All data"
    })
})

export const updateBook= asyncHandler(async (req,res,next) => {
    const {id}=req.params;

    // const author=await Book.findById({_id:id},{isDeleted:false})

    // if (!author) {
    //     const error = new Error("Book not found");
    //     error.code = 404;
    //     return next(error);
    // }

    const book = await Book.findById(id);
    if (!book) {
        const error = new Error("Deleted book not found");
        error.code = 404;
        return next(error);
    }
    const updates = {...req.body};

     if (req.file) {
       updates.coverImage = await replaceImage(req, book.coverImage, 'coverImage');
     }
    const newbook = await Book.findOneAndUpdate(
        { _id: id, isDeleted: false }, 
        { $set: updates },
        { new: true }
    );

    await newbook.populate("authorID");
    
    // const {title,coverImage,authorID,publishedDate}=req.body;

    // const newBook= await Book.updateOne({_id:id},{isDeleted:false},{
    //     title,coverImage,authorID,publishedDate
    // })

    return res.status(200).json({
            success: true,
            data: book,
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

export const restoreBook = asyncHandler(async (req, res, next) => {
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