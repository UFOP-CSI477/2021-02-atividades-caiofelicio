import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "../../variables.env";

export function generateToken({ id, name }: { id: string, name: string }) {
  const token = sign(
    {
      name,
      id
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return token;
}

