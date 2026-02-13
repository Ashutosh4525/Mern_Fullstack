import express from "express"
import { authware,isAdmin } from "../middlewares/auth.middleware"
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { 
    createAuthor, getAllAuthor, getSingleAuthor, 
    updateAuthor, softDeleteAuthor, restoreAuthor 
} from "../controller/author.controller";
import { authorValidator } from "../middlewares/author.validator"; 

const authorRouter = express.Router();

authorRouter.get("/", 
    ...authorValidator.search, 
    handleValidationErrors, 
    getAllAuthor
);

authorRouter.get("/:id", 
    ...authorValidator.idParam, 
    handleValidationErrors, 
    getSingleAuthor
);

authorRouter.post("/create", 
    authware, isAdmin,
    ...authorValidator.create, 
    handleValidationErrors, 
    createAuthor
);

authorRouter.put("/:id", 
    authware, isAdmin,
    ...authorValidator.update, 
    handleValidationErrors, 
    updateAuthor
);

authorRouter.delete("/softdelete/:id", 
    authware, isAdmin,
    ...authorValidator.idParam, 
    handleValidationErrors, 
    softDeleteAuthor
);

authorRouter.post("/restore/:id", 
    authware, isAdmin,
    ...authorValidator.idParam, 
    handleValidationErrors, 
    restoreAuthor
);

export default authorRouter;