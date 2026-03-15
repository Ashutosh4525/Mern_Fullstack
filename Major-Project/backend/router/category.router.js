
import express from "express";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory ,
    restoreCategory
} from "../controller/category.controller.js";
import { Authverify,verifyAdmin } from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();


categoryRouter.get("/all", getAllCategories);


categoryRouter.post("/create", Authverify, createCategory);
categoryRouter.put("/update/:id", Authverify,verifyAdmin, updateCategory);
categoryRouter.delete("/delete/:id", Authverify, verifyAdmin, deleteCategory);
categoryRouter.patch("/restore/:id", Authverify, verifyAdmin, restoreCategory);

export default categoryRouter;