import { Request, Response } from 'express';
import CreateRegisterService from '../../services/Registros/CreateRegisterService';

export default class CreateRegisterController {
  async handle(req: Request, response: Response) {
    const { description, limit, type, equipmentId } = req.body;
    const { userId } = req;

    const createRegisterService = new CreateRegisterService();
    const register = await createRegisterService.execute({
      description,
      limit,
      type,
      equipmentId,
      userId,
    });

    return response.status(200).json(register);
  }
}
