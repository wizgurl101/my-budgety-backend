import express from "express";
import { GetAllCategories } from "../controllers/categoryKeywordController";

const router = express.Router();

router
.route("/:userId/categories")
.get(GetAllCategories)

export default router