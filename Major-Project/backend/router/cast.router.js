import express from "express";
import { 
    createCast, 
    getAllCast, 
    updateCast, 
    deleteCast,
    restoreCast 
} from "../controller/cast.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify,verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { castValidator } from "../validators/cast.validator.js";

const castRouter = express.Router();

const castUpload = upload.single("profileImage");

castRouter.get("/all", castValidator.getAll,validate,getAllCast);
castRouter.post("/create", Authverify, verifyAdmin, castUpload, castValidator.create, validate, createCast);
castRouter.put("/update/:id", Authverify, verifyAdmin, castUpload, castValidator.idParam, castValidator.update, validate, updateCast);
castRouter.patch("/delete/:id", castValidator.idParam,validate,Authverify, verifyAdmin,deleteCast);
castRouter.patch("/restore/:id", castValidator.idParam,validate,Authverify, verifyAdmin,restoreCast);


export default castRouter;


