import express from "express";
import {GetAllCategories, addNewCategory, deleteCategory, updateCategory} from "../controllers/categoryController";

const router = express.Router();

router
    .route("/:userId")
    .get(GetAllCategories)
    .post(addNewCategory)
    .delete(deleteCategory)
    .put(updateCategory)


export default router