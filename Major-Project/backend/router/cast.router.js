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
import { castValidator } from "../validators/cast.validator.js";

const castRouter = express.Router();

const castUpload = upload.single("profileImage");

castRouter.get("/all", castValidator.getAll,getAllCast);
castRouter.post("/create", castValidator.create,Authverify, verifyAdmin,castUpload, createCast);
castRouter.put("/update/:id",castValidator.idParam, castValidator.update,Authverify, verifyAdmin,castUpload, updateCast);
castRouter.patch("/delete/:id", castValidator.idParam,Authverify, verifyAdmin,deleteCast);
castRouter.patch("/restore/:id", castValidator.idParam,Authverify, verifyAdmin,restoreCast);


export default castRouter;


