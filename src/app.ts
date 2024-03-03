import express from "express";
import * as dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use("/my-budget/api/v1/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(
    `My Budget Backend is listening at http://localhost:${port}`
  );
});
