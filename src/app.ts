import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

// Now you can use process.env.GOOGLE_APPLICATION_CREDENTIALS

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(
    `Express is listening at http://localhost:${
      process.env.PORT || port
    } and secret is ${process.env.TEST}`
  );
});
