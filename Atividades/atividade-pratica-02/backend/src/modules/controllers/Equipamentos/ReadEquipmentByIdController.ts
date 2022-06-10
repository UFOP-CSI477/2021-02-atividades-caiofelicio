import { Request, Response } from "express";
import ReadEquipmentByIdService from "../../services/Equipamentos/ReadEquipmentByIdService";

export default class ReadEquipmentByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const readEquipmentByIdService = new ReadEquipmentByIdService()

    const equipment = await readEquipmentByIdService.execute({ id })

    return res.status(200).json(equipment)

  }
}