import express from "express"
import { authware,isAdmin } from "../middlewares/auth.middleware"
import { validationResult } from "express-validator"
import uploads from "../middlewares/upload.middleware"
import { createBook, getAllBook, restoreBook, softDeleteBook } from "../controller/book.controller";
import { bookValidator } from "../middlewares/book.middleware";

const bookRouter=express.Router();
const app=express();

bookRouter.get("/getbooks", 
    bookValidator.search, 
    validationResult, 
    getAllBook
)

bookRouter.post("/createbook", 
    bookValidator.create, 
    validationResult, 
    createBook
);

bookRouter.delete("/softdelete/:id", 
    bookValidator.idParam, 
    validationResult, 
    softDeleteBook
);

bookRouter.post("/restore", 
    body("id").isMongoId().withMessage("Valid ID required in body"), 
    validationResult, 
    restoreBook
);

export default bookRouter;