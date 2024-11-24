import { Request, Response } from "express";
import DatabaseService from "../services/database.service";
import { BigQueryDatabase} from "../repository/bigquery.repository";
import UUIDService from "../services/uuid.service";

export const GetAllCategories = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `SELECT ROW_NUMBER() OVER() AS id, category_id, name FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category `
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
        //todo add in logging for errors
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
            + `(category_id, user_id, name) VALUES `
            + `('${categoryID}', '${userId}', '${categoryName}')`;
        await database.query(query);

        return res
            .status(200)
            .json({
                status: "success",
                message: "Add new category was successfully"
            });
    } catch (err) {
        return res
            .status(500)
            .json({
              status: "error",
              message: "Unable to add new category",
        });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const categoryID = req.body.categoryId;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `DELETE FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category `
            + `WHERE user_id = '${userId}' AND category_id = '${categoryID}'`;
        await database.query(query);

        return res
            .status(200)
            .json({
                status: "success",
                message: "Delete category was successfully"
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                status: "error",
                message: "Unable to delete category",
            });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const categoryID = req.body.categoryId;
        const newName = req.body.name;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `UPDATE ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category `
            + `SET name = '${newName}' `
            + `WHERE user_id = '${userId}' AND category_id = '${categoryID}'`;
        await database.query(query);

        return res
            .status(200)
            .json({
                status: "success",
                message: "Update category was successfully"
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                status: "error",
                message: "Unable to update category",
            });
    }
}