import { Request, Response } from "express";
import { executeUserQuery } from "../db/bigquery";

// todo For testing purpose delete later
export const testUser = (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    message: "Test User works",
  });
};

export const GetUser = async (req: Request, res: Response) => {
  try {
    await executeUserQuery();
    return  res.status(200).json({
      status: "success",
      message: "Get User data was successfully fetched",
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

}