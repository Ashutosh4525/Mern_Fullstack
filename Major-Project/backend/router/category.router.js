
import express from "express";
import { 
    createCategory, 
    getAllCategories,
    getAllCategoriesIncludingDeleted,
    updateCategory, 
    deleteCategory,
    restoreCategory
} from "../controller/category.controller.js";
import { Authverify,verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { categoryValidator } from "../validators/category.validator.js";

const categoryRouter = express.Router();


categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/all-admin", Authverify, verifyAdmin, getAllCategoriesIncludingDeleted);

categoryRouter.post("/create", categoryValidator.create,validate,Authverify, verifyAdmin,createCategory);
categoryRouter.put("/update/:id",categoryValidator.update,validate, Authverify,verifyAdmin, updateCategory);
categoryRouter.delete("/delete/:id",categoryValidator.idParam,validate, Authverify, verifyAdmin, deleteCategory);
categoryRouter.patch("/restore/:id",categoryValidator.idParam,validate, Authverify, verifyAdmin, restoreCategory);

export default categoryRouter;