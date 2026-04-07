import express from "express";
import {
    createContent,
    getAllContent,
    getAllContentIncludingDeleted,
    getContentById,
    updateContent,
    deleteContent,
    restoreContent
} from "../controller/content.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { contentValidator } from "../validators/content.validator.js";

const contentRouter = express.Router();

const contentUpload = upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "trailer", maxCount: 1 }
]);

contentRouter.get("/all", getAllContent);
contentRouter.get("/all-admin", Authverify, verifyAdmin, getAllContentIncludingDeleted);
contentRouter.get("/:id", contentValidator.idParam,validate, getContentById);
contentRouter.post("/create", Authverify, verifyAdmin, contentUpload, contentValidator.create, validate, createContent);
contentRouter.put("/update/:id", Authverify, verifyAdmin, contentUpload, contentValidator.idParam, contentValidator.update, validate, updateContent);
contentRouter.patch("/delete/:id", contentValidator.idParam,validate, Authverify, verifyAdmin, deleteContent);
contentRouter.patch("/restore/:id", contentValidator.idParam,validate, Authverify, verifyAdmin, restoreContent);


export default contentRouter;
