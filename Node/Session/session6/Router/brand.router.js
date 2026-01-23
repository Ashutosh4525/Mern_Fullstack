import express from "express";
import { createBrand,deleteBrand,updateBrand,getBrand } from "../Controller/brand.controller.js";
import { authMiddleware, isAdmin } from "../Middleware/auth.middleware.js";

const brandRouter=express.Router();

brandRouter.post("/",authMiddleware, createBrand)
brandRouter.get("/",getBrand)
brandRouter.put("/:id",authMiddleware,isAdmin,updateBrand)
brandRouter.delete("/:id",authMiddleware,isAdmin,deleteBrand)

export default brandRouter;