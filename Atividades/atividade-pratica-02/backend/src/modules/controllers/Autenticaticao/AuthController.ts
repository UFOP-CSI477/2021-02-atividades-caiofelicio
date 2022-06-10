import { Request, Response } from "express";
import AuthService from "../../services/Autenticaticao/AuthService"

export default class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authService = new AuthService();

    const token = await authService.execute({ email, password });

    return res.status(200).json({
      message: "Authenticated successfully",
      token
    })

  }
}