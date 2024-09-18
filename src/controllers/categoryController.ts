import { Request, Response } from "express";
import DatabaseService from "../services/database.service";
import { BigQueryDatabase} from "../repository/bigquery.repository";
import UUIDService from "../services/uuid.service";

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

export const addNewCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const categoryID = UUIDService.generateUUID();
        const categoryName = req.body.name;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `INSERT INTO ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category `
            + `(category_id, user_id, category_name) VALUES `
            + `('${categoryID}', '${userId}', '${categoryName}')`;
        await database.query(query);

        return res
            .status(200)
            .json({
                status: "success",
                message: "Add new category was successfully"
            });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({
              status: "error",
              message: "Unable to add new category",
        });
    }
}