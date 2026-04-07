import express from "express";
import {
    createEpisode,
    getEpisodesBySeason,
    getAllEpisodesIncludingDeleted,
    getEpisodeById,
    updateEpisode,
    deleteEpisode,
    restoreEpisode,
    watchEpisode
} from "../controller/episode.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { Authverify, verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { episodeValidator } from "../validators/episode.validators.js";

const episodeRouter = express.Router();

const episodeUpload = upload.fields([
    { name: "video", maxCount: 1 }
]);

episodeRouter.get("/season/:seasonId", getEpisodesBySeason);
episodeRouter.get("/all-admin/all", Authverify, verifyAdmin, getAllEpisodesIncludingDeleted);
episodeRouter.get("/:id", episodeValidator.idParam,validate, getEpisodeById);
episodeRouter.post("/create", Authverify, verifyAdmin, episodeUpload, episodeValidator.create, validate, createEpisode);
episodeRouter.put("/update/:id", Authverify, verifyAdmin, episodeUpload, episodeValidator.idParam, episodeValidator.update, validate, updateEpisode);
episodeRouter.patch("/delete/:id", episodeValidator.idParam,validate, Authverify, verifyAdmin, deleteEpisode);
episodeRouter.patch("/restore/:id", episodeValidator.idParam,validate, Authverify, verifyAdmin, restoreEpisode);
episodeRouter.post("/watch/:id", episodeValidator.idParam,validate, Authverify, watchEpisode);
episodeRouter.get("/watch/:id/stream", episodeValidator.idParam,validate,Authverify, watchEpisode);

export default episodeRouter;
