import express from "express";
import { createCategory,deleteCategory,updateCategory,getCategory } from "../Controller/category.controller.js";

const categoryRouter=express.Router();

categoryRouter.post("/",createCategory)
categoryRouter.get("/",getCategory)
categoryRouter.put("/:id",updateCategory)
categoryRouter.delete("/:id",deleteCategory)

export default categoryRouter;