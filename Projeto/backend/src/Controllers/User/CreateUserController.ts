import { Request, Response } from "express";
import CreateUserService from "../../Service/User/CreateUserService";

export default class CreateUserController {
  static async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const user = await CreateUserService.execute({ name, email, password, phone });

    return res.status(200).json(user);

  }
}