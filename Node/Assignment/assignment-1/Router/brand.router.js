import express from "express";
import { createBrand,deleteBrand,updateBrand,getBrand } from "../Controller/brand.controller.js";

const brandRouter=express.Router();

brandRouter.post("/",createBrand)
brandRouter.get("/",getBrand)
brandRouter.put("/:id",updateBrand)
brandRouter.delete("/:id",deleteBrand)

export default brandRouter;