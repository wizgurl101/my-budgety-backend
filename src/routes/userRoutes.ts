import express from "express";
import { testUser, GetUser } from "../controllers/userController";

const router = express.Router();

// todo For testing purpose delete later
/**
 * @swagger
 * /my-budget/api/v1/users/test:
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

/**
 * @swagger
 * /my-budget/api/v1/users/user:
 *   get:
 *     summary: Get User Data Endpoint
 *     description: Successfully call this endpoint
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               Status: string
 *               Message: string
 *        500:
 *         description: Unsuccessful response
 *         content:
 *           application/json:
 *             schema:
 *               Status: string
 *               Message: string
 */
router.get("/user", GetUser)

export default router;
