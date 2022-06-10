import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../variables.env";
import AppError from "../errors/AppError";

interface IPayload {
  id: string;
  name: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(" ");

    const decoded = verify(token, JWT_SECRET) as IPayload;

    if (!decoded) throw new AppError("Token expired", 403)

    req.userId = decoded.id;

    return next()

  }

  throw new AppError("Unauthorized", 401)
}