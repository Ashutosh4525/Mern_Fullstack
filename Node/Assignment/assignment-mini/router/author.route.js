import express from "express"
import { authware,isAdmin } from "../middlewares/auth.middleware"
import { validationResult } from "express-validator"
import { 
    createAuthor, getAllAuthors, getSingleAuthor, 
    updateAuthor, softDeleteAuthor, restoreAuthor 
} from "../controller/author.controller";
import { authorValidator } from "../middlewares/author.validator"; 

const authorRouter = express.Router();

authorRouter.get("/", 
    authorValidator.search, 
    validationResult, 
    getAllAuthors
);

authorRouter.get("/:id", 
    authorValidator.idParam, 
    validationResult, 
    getSingleAuthor
);

authorRouter.post("/create", 
    authware, isAdmin,
    authorValidator.create, 
    validationResult, 
    uploads.single('avatar'),  // Optional
    createAuthor
);

authorRouter.put("/:id", 
    authware, isAdmin,
    authorValidator.update, 
    validationResult, 
    updateAuthor
);

authorRouter.delete("/softdelete/:id", 
    authware, isAdmin,
    authorValidator.idParam, 
    validationResult, 
    softDeleteAuthor
);

authorRouter.post("/restore/:id", 
    authware, isAdmin,
    authorValidator.idParam, 
    validationResult, 
    restoreAuthor
);

export default authorRouter;