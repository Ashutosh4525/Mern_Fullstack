import express from "express"
import { authware,isAdmin } from "../middlewares/auth.middleware"
import {handleValidationErrors} from "../middlewares/validation.middleware"
import { bookCoverMulter } from "../middlewares/upload.middleware";
import { createBook, getAllBook, restoreBook, softDeleteBook, updateBook,getSingleBook } from "../controller/book.controller";
import { bookValidator } from "../middlewares/book.middleware";
import { body } from "express-validator";
const bookRouter=express.Router();

bookRouter.get("/getbooks", 
    ...bookValidator.search, 
    handleValidationErrors, 
    getAllBook
)

bookRouter.get("/getbooks/:id", 
    ...bookValidator.search, 
    handleValidationErrors, 
    getSingleBook
)

bookRouter.post("/createbook", 
    authware,
    isAdmin,
    bookCoverMulter.single("coverImage"),
    ...bookValidator.create, 
    handleValidationErrors, 
    createBook
);

bookRouter.put("/updatebook/:id", 
  authware,
  isAdmin,
  bookCoverMulter.single("coverImage"),
  ...bookValidator.update,
  handleValidationErrors, 
  updateBook
);
bookRouter.delete("/softdelete/:id", 
    ...bookValidator.idParam, 
    handleValidationErrors, 
    softDeleteBook
);

bookRouter.post("/restore", 
    body("id").isMongoId().withMessage("Valid ID required in body"), 
    handleValidationErrors, 
    restoreBook
);

export default bookRouter;