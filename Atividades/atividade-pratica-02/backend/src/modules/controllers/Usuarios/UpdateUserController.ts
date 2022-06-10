import { Request, Response } from "express";
import UpdateUserService from "../../services/Usuarios/UpdateUserService";

export default class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const { id } = req.params

    const updateUserService = new UpdateUserService()

    const user = await updateUserService.execute({ email, password, userId: id })

    if (user) return res.status(200).json(user)

    return res.status(200).end()

  }
}