import express from "express";
import * as dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//todo create this when deploying to production since this enable ALL CORS requests
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Budgety API Documentation",
      version: "1.0.0",
      description: "My Budgety Backend API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/userRoutes.ts", "./src/routes/categoryRoutes.ts"],
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use("/my-budgety/api/v1/users", userRoutes);
app.use("/my-budgety/api/v1/category", categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(
    `My Budget Backend is listening at http://localhost:${port}`
  );
});
