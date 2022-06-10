import AppError from '../../../shared/errors/AppError';
import { prismaClient } from '../../../shared/infra/database/prismaClient';

interface IUpdateEquipmentRequest {
  id: string;
  name: string;
}
export default class UpdateEquipmentService {
  async execute({ name, id }: IUpdateEquipmentRequest) {
    if (!name) throw new AppError('Equipment name is required', 400);

    try {
      const updatedEquipment = await prismaClient.equipment.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return updatedEquipment;
    } catch (err) {
      throw new AppError('Equipment not found', 404);
    }
  }
}
