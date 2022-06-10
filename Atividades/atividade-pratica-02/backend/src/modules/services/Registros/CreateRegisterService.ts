import AppError from '../../../shared/errors/AppError';
import { prismaClient } from '../../../shared/infra/database/prismaClient';
import { checkDate } from '../../../utils/checkDate';

interface ICreateRegisterRequest {
  description: string;
  limit: string;
  type: number;
  equipmentId: string;
  userId: string;
}

export default class CreateRegisterService {
  async execute({
    description,
    limit,
    type,
    equipmentId,
    userId,
  }: ICreateRegisterRequest) {
    if (!description) throw new AppError('Description is required', 400);

    if (!type) throw new AppError('Type is required', 400);

    if (type < 1 || type > 3)
      throw new AppError(
        'Type must be 1 - preventive, 2 - corrective or 3 - urgent',
        400
      );

    if (!limit) throw new AppError('Limit date is required', 400);

    const limitVerified = checkDate(limit);

    if (!equipmentId) throw new AppError('Equipment id is required', 400);
    const equipmentExists = await prismaClient.equipment.findUnique({
      where: { id: equipmentId },
    });

    if (!equipmentExists) throw new AppError('Equipment not found', 404);

    const register = await prismaClient.register.create({
      data: {
        description,
        limit: limitVerified,
        type,
        equipment: {
          connect: {
            id: equipmentId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return register;
  }
}
