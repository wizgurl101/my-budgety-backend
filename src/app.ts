import { getSecret } from "./services/secretsService";

import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/test-secret", async (req, res) => {
  console.log("GET /test-secret");
  await getSecret(process.env.TEST_SECRET_NAME || "");
  res.send("Get test secret from Secret Manager successfully!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
