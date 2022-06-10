import { Request, Response } from "express"
import ReadUsersService from "../../services/Usuarios/ReadUsersService"

export default class ReadUsersController {
  async handle(req: Request, res: Response) {

    const readUsersController = new ReadUsersService()

    const users = await readUsersController.execute()

    return res.status(200).json(users)

  }
}