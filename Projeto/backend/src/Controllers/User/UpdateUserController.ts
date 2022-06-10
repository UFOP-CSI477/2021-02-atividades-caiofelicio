import { Request, Response } from "express"
import UpdateUserService from "../../Service/User/UpdateUserService";

export default class UpdateUserController {
  static async handle(req: Request, res: Response) {
    const { email, password, phone } = req.body;
    const image = req.file ? req.file.location : undefined;

    const user = await UpdateUserService.execute({ id: req.userId, email, password, phone, image })

    return res.status(200).json(user);
  }
}