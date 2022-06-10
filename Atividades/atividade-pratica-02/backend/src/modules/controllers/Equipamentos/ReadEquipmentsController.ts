import { Request, Response } from "express";
import ReadEquipmentsService from "../../services/Equipamentos/ReadEquipmentsService";

export default class ReadEquipmentsController {
  async handle(req: Request, res: Response) {
    const readEquipmentsService = new ReadEquipmentsService()

    const equipments = await readEquipmentsService.execute()

    return res.status(200).json(equipments)

  }
}