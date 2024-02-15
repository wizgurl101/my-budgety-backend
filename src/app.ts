import { getSecret } from "./services/secretsService";

import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
