import { Request, Response } from "express";
import DeleteEquipmentService from "../../services/Equipamentos/DeleteEquipmentService";

export default class DeleteEquipmentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteEquipmentService = new DeleteEquipmentService()

    await deleteEquipmentService.execute({ id })

    return res.status(200).json({ message: "Equipment deleted successfully" })

  }
}