import express, { NextFunction, Request, Response } from "express"
import AppError from "./errors/AppError"
import cors from "cors"
import Routes from "./Routes/Routes"
import { deleteFile } from "./utils/deleteFile"

const app = express()

app.use(express.json())
app.use(cors())
app.use(Routes)

app.use(
  (err: AppError | any, req: Request, res: Response, next: NextFunction) => {

    // if (req.file) {
    //   deleteFile(req.file.filename)
    // }

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      })
    }

    if (err["code"] && err["code"] === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Only 3 pet images are allowed"
      })
    }

    return res.status(500).json({
      message: err.message
    })
  }
)

export default app