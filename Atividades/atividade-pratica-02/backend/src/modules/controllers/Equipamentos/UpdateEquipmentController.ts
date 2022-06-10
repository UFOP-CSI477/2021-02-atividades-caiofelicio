import { Request, Response } from 'express';
import UpdateEquipmentService from '../../services/Equipamentos/UpdateEquipmentService';

export default class UpdateEquipmentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const updateEquipmentService = new UpdateEquipmentService();
    const equipment = await updateEquipmentService.execute({
      id,
      name,
    });
    return res.status(200).json(equipment);
  }
}
