import express from "express";
import { createcategory } from "../controller/category.controller";

const createRouter=express.Router();

createRouter.post("/",createcategory)

export default createRouter;