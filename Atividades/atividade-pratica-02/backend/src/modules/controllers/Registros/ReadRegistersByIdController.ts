import { Request, Response } from "express"
import ReadRegistersByIdService from "../../services/Registros/ReadRegistersByIdService"


export default class ReadRegistersByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const readRegistersByIdService = new ReadRegistersByIdService()

    const registers = await readRegistersByIdService.execute({ id })

    return res.status(200).json(registers)

  }
}