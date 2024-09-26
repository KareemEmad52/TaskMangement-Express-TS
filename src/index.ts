import express, { NextFunction, Request, Response } from "express";
import v1Router from "./Routers/router";
import cors from "cors";
import dotenv from "dotenv";
import { DB_CONNECTION } from "./DB/DB.connection";
import { AppError } from "./middlewares/errorHandler";
import morgan from "morgan";

dotenv.config();

const PORT = +process.env.PORT! || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));



app.use("/api/v1", v1Router);
app.all('*', (req, res, next) => {
  throw new AppError('Route not found', 404)
})

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { status, stack, message } = err;
  res.status(status || 500).json({
    status: "error",
    message,
    ...(process.env.MODE === "development" && { stack }),
  });
});

DB_CONNECTION();
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
