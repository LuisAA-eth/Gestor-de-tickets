import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "./helpers/rateLimit.js";
import usersRoutes from "./routes/usersRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js";
import error from "./middlewares/error.js";

const app = express();

const DB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/ticketing-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticketing-db";

mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to DB: ${DB_URL}`))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === "prod") {
  app.use(compression());
  app.use(rateLimit);
}
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.use("/api/users", usersRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use(error);

export default app;
