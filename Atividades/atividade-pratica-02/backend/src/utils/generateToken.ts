import { sign } from 'jsonwebtoken';
import { getEnv } from './getEnv';

interface ITokenPayload {
  id: string;
  email: string;
  is_admin: boolean;
  name: string;
}

export function generateToken({ id, email, is_admin, name }: ITokenPayload) {
  const token = sign(
    { email, is_admin, name, id },
    getEnv('SECRET') as string,
    {
      expiresIn: '1d',
    }
  );
  return token;
}
