import express from "express";
import { createCategory,deleteCategory,updateCategory,getCategory } from "../Controller/category.controller.js";
import { authMiddleware, isAdmin } from "../Middleware/auth.middleware.js";

const categoryRouter=express.Router();

categoryRouter.post("/",createCategory)
categoryRouter.get("/",getCategory)
categoryRouter.put("/:id",authMiddleware,isAdmin,updateCategory)
categoryRouter.delete("/:id",authMiddleware,isAdmin,deleteCategory)

export default categoryRouter;