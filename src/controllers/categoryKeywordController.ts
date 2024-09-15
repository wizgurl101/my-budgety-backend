import { Request, Response } from "express";
import DatabaseService from "../services/database.service";
import { BigQueryDatabase} from "../repository/bigquery.repository";

export const GetAllCategories = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `SELECT * FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category `
                                + `WHERE user_id = '${userId}'`;
        const categoriesData = await database.query(query);

        return res
            .status(200)
            .json({
                status: "success",
                message: "Get all categories data was successfully fetched",
                data: categoriesData,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({
              status: "error",
              message: "Internal Server Error",
        });
    }
}