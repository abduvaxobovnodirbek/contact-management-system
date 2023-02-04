const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");

const connectToDatabase = require("./database/database");

dotenv.config({ path: "./env/.env" });

connectToDatabase();

const authRouter = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const categoryRouter = require("./routes/category");
const contactRoutes = require("./routes/contact");
const searchRoutes = require("./routes/search");
const errorHandler = require("./middlewares/error");

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors("*"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/search", searchRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
