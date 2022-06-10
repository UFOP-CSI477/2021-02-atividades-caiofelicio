import { Request, Response } from "express"
import AuthService from "../../Service/Auth/AuthService";

export default class AuthController {
  static async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await AuthService.execute({ email, password });

    return res.status(200).json({ token });
  }
}