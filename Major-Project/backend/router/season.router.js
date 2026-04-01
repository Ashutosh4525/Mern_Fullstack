import express from "express";
import {
    createSeason,
    getSeasonsByContent,
    getSeasonById,
    updateSeason,
    deleteSeason,
    restoreSeason
} from "../controller/season.controller.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { seasonValidator } from "../validators/season.validator.js";

const seasonRouter = express.Router();

seasonRouter.get("/content/:contentId", getSeasonsByContent);
seasonRouter.get("/:id", seasonValidator.idParam,validate, getSeasonById);
seasonRouter.post("/create", seasonValidator.create,validate, Authverify, verifyAdmin, createSeason);
seasonRouter.put("/update/:id", seasonValidator.idParam, seasonValidator.update,validate, Authverify, verifyAdmin, updateSeason);
seasonRouter.patch("/delete/:id", seasonValidator.idParam,validate, Authverify, verifyAdmin, deleteSeason);
seasonRouter.patch("/restore/:id", seasonValidator.idParam,validate, Authverify, verifyAdmin, restoreSeason);

export default seasonRouter;