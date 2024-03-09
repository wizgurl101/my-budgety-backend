import express from "express";
import { testUser } from "../controllers/userController";

const router = express.Router();

// todo For testing purpose delete later
router.get("/test", testUser)

export default router;
