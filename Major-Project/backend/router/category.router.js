
import express from "express";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory ,
    restoreCategory
} from "../controller/category.controller.js";
import { Authverify,verifyAdmin } from "../middlewares/auth.middleware.js";
import { categoryValidator } from "../validators/category.validator.js";

const categoryRouter = express.Router();


categoryRouter.get("/all", getAllCategories);


categoryRouter.post("/create", categoryValidator.create,Authverify, createCategory);
categoryRouter.put("/update/:id",categoryValidator.update, Authverify,verifyAdmin, updateCategory);
categoryRouter.delete("/delete/:id",categoryValidator.idParam, Authverify, verifyAdmin, deleteCategory);
categoryRouter.patch("/restore/:id",categoryValidator.idParam, Authverify, verifyAdmin, restoreCategory);

export default categoryRouter;