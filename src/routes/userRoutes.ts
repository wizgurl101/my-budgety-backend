import express from "express";
import { testUser } from "../controllers/userController";

const router = express.Router();

//todo: For testing purposes only
router.get("/test", testUser);

export default router;
