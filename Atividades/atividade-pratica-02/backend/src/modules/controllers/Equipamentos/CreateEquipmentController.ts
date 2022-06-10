import { Request, Response } from 'express';
import CreateEquipmentService from '../../services/Equipamentos/CreateEquipmentService';

export default class CreateEquipmentController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createEquipmentService = new CreateEquipmentService();
    const equipment = await createEquipmentService.execute({ name });

    return response.status(200).json(equipment);
  }
}
