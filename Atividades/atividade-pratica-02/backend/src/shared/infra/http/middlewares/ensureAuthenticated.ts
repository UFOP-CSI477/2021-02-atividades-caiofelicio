import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnv } from '../../../../utils/getEnv';
import AppError from '../../../errors/AppError';

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Unauthorized', 401);
  const token = authHeader.split(' ')[1];

  try {
    const { id } = verify(token, getEnv('SECRET') as string) as { id: string };
    req.userId = id as string;
    return next();
  } catch (err) {
    throw new AppError('Token expired', 403);
  }
}

export { ensureAuthenticated };
