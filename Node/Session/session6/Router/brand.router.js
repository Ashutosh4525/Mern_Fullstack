import express from "express";
import { createBrand,deleteBrand,updateBrand,getBrand } from "../Controller/brand.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const brandRouter=express.Router();

brandRouter.post("/",authMiddleware, createBrand)
brandRouter.get("/",getBrand)
brandRouter.put("/:id",updateBrand)
brandRouter.delete("/:id",deleteBrand)

export default brandRouter;