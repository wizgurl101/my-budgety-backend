import { Request, Response } from "express";
import DatabaseService from "../services/database.service";
import { BigQueryDatabase} from "../repository/bigquery.repository";

// TODO need to re-implement this function to return user with user id, currently using this for testing
export const GetUser = async (req: Request, res: Response) => {
  try {
      const BigQuery = new BigQueryDatabase();
      const database = new DatabaseService(BigQuery);
      const query = `SELECT * FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.users LIMIT 1000`;
      const usersData = await database.query(query);

      return  res.status(200).json({
          status: "success",
          message: "Get User data was successfully fetched",
          data: usersData,
    });
  }  catch(err) {
    console.error(err)
    return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
    });
  }

}

export const GetCurrentMonthSumExpanse = async (req: Request, res: Response) => {
  //todo finish implementation -- check query if it return the correct data
    try {
        const userId = req.params.userId;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `SELECT * FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.expanse 
                            WHERE user_id = ${userId} AND MONTH(date) = MONTH(CURRENT_DATE()) LIMIT 1000`;
        const expanceData = await database.query(query);

        return res.status(200).json({
            status: "success",
            message: "Get current month expanse data was successfully fetched",
            data: expanceData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
    }
}

export const GetAllKeywords = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const BigQuery = new BigQueryDatabase();
        const database = new DatabaseService(BigQuery);
        const query = `SELECT k.category_id, k.keyword_id, k.name, c.user_id `
                            + `FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.keywords k `
                            + `JOIN ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category c `
                            + `ON k.category_id = c.category_id `
                            + `WHERE user_id = '${userId}'`;


        const keywords = await database.query(query);
        return res.status(200).json({
          status: "success",
          data: keywords,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
    }
}