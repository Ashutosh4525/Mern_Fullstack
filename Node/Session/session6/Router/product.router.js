import express from "express";
import { createProduct, getProduct } from "../Controller/product.controller";
import { authMiddleware, isAdmin } from "../Middleware/auth.middleware.js";

const ProductRouter=express.Router();

ProductRouter.post("/",authMiddleware,createProduct)
ProductRouter.get("/",getProduct)
// ProductRouter.put("/:id",authMiddleware,isAdmin,updateCategory)
// ProductRouter.delete("/:id",authMiddleware,isAdmin,deleteCategory)

export default categoryRouter;