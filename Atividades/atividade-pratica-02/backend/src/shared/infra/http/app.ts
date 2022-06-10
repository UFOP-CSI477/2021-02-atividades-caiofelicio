import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import AppError from "../../errors/AppError";
import routes from "./routes/routes";

const app = express()

app.set("base", "/api");

app.use(express.json());
app.use(cors());

app.use(routes)

app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) return res.status(err.statusCode).json({
      message: err.message
    })

    return res.status(500).json({
      message: err
    })
  }
)

export default app