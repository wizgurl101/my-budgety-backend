import express from "express";
import { GetAllCategories, addNewCategory } from "../controllers/categoryController";

const router = express.Router();

router
    .route("/:userId")
    .get(GetAllCategories)
    .post(addNewCategory)


export default router