import { Request, Response } from "express"
import CreateUserService from "../../services/Usuarios/CreateUserService"

export default class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, is_admin } = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, password, is_admin })

    return res.status(200).json(user)

  }
}