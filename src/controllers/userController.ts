import { Request, Response } from "express";

// todo For testing purpose delete later
export const testUser = (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    message: "Test User works",
  });
};
