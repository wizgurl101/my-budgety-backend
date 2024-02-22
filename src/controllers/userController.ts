import { Request, Response } from "express";

//TODO: For testing purposes only
const testUser = async (req: Request, res: Response) => {
  console.log("request to test user");
  res.status(200).jsonp({ message: "Test User controller works!" });
};

export { testUser };
