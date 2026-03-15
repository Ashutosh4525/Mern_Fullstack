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

const castRouter = express.Router();

const castUpload = upload.single("profileImage");

castRouter.get("/all", getAllCast);
castRouter.post("/create", Authverify, verifyAdmin,castUpload, createCast);
castRouter.put("/update/:id", Authverify, verifyAdmin,castUpload, updateCast);
castRouter.patch("/delete/:id", Authverify, verifyAdmin,deleteCast);
castRouter.patch("/restore/:id", Authverify, verifyAdmin,restoreCast);


export default castRouter;


