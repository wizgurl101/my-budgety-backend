import express from "express";
import { GetUser, GetAllKeywords } from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * /my-budget/api/v1/users/user:
 *   get:
 *     summary: Get User Data Endpoint
 *     description: Successfully call this endpoint
 *     responses:
 *       200
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

/**
 * @swagger
 * /my-budget/api/v1/users/userId/keywords:
 *   get:
 *     summary: Get all User's keywords
 *     description: Get all the entries in the keywords table for a specific user
 *     responses:
 *       200
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
router
    .route("/:userId/keywords")
    .get(GetAllKeywords)

export default router;
