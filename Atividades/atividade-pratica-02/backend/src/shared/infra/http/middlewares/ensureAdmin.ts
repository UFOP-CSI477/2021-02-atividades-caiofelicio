import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnv } from '../../../../utils/getEnv';
import AppError from '../../../errors/AppError';
import { prismaClient } from '../../database/prismaClient';

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const { id } = verify(token, getEnv('SECRET') as string) as { id: string };

  const user = await prismaClient.user.findUnique({
    where: { id },
  });
  if (user.is_admin) return next();

  throw new AppError('You must be an admin to access this route', 401);
}

export { ensureAdmin };
