import { Request, Response } from "express"
import UpdateRegisterService from "../../services/Registros/UpdateRegisterService";


export default class UpdateRegisterController {
  async handle(req: Request, res: Response) {
    const { description, limit, type } = req.body;
    const { id } = req.params;

    const updateRegisterService = new UpdateRegisterService()

    const register = await updateRegisterService.execute({ id, description, limit, type })

    return res.status(200).json(register)
  }
}