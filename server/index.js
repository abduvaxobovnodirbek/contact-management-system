const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");

const connectToDatabase = require("./database/database");

dotenv.config({ path: "./env/.env" });

connectToDatabase();

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
