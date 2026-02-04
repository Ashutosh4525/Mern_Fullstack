import express from "express";
import { createBrand,deleteBrand,updateBrand,getBrand } from "../Controller/brand.controller.js";
import { authMiddleware, isAdmin } from "../Middleware/auth.middleware.js";
import { validateCreateBrand,validateUpdateBrand,validateDeleteBrand,handleValidationErrors } from "../Middleware/brand.middleware.js";
import uploads from "../Middleware/upload.middleware.js";
const brandRouter=express.Router();

const fileWithUploads=uploads.fields([
            {name:"logo", maxCount:1},
            {name:"images", maxCount:5}
        ])

brandRouter.post("/", fileWithUploads,validateCreateBrand,handleValidationErrors,createBrand)
brandRouter.get("/",getBrand)
brandRouter.put("/:id",validateUpdateBrand,handleValidationErrors,updateBrand)
brandRouter.delete("/:id",authMiddleware,isAdmin,validateDeleteBrand,handleValidationErrors,deleteBrand)

export default brandRouter;