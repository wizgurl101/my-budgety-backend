import express from "express";
import { testUser } from "../controllers/userController";

const router = express.Router();

// todo For testing purpose delete later
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get Test User Endpoint
 *     description: Successfully call this endpoint
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               Status: string
 *               Message: string
 */
router.get("/test", testUser)

export default router;
