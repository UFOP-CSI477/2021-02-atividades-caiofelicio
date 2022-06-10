import { compare } from "bcryptjs";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import { generateToken } from "../../utils/generateToken";

interface IAuthService {
  email: string;
  password: string;
}

export default class AuthService {
  static async execute({ email, password }: IAuthService) {

    const user = await User.findOne({ email });

    if (!user) throw new AppError("Email e/ou senha incorretos", 400);

    const matchPassword = await compare(password, user.password);
    
    if (!matchPassword) throw new AppError("Email e/ou senha incorretos", 400);

    const token = generateToken({ id: user.id, name: user.name });

    return token;

  }
}