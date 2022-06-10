import { compare } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import { prismaClient } from '../../../shared/infra/database/prismaClient';
import { generateToken } from '../../../utils/generateToken';

interface IAuthRequest {
  email: string;
  password: string;
}

export default class AuthService {
  async execute({ email, password }: IAuthRequest) {
    if (!email) throw new AppError('Email is required', 400);

    if (!password) throw new AppError('Password is required', 400);

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) throw new AppError('Incorrect email and/or password', 400);

    if (!(await compare(password, user.password)))
      throw new AppError('Incorrect email and/or password', 400);

    const token = generateToken({
      id: user.id,
      email,
      is_admin: user.is_admin,
      name: user.name,
    });

    return token;
  }
}
