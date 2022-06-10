import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";

interface IReadEquipmentByIdRequest {
  id: string;
}

export default class ReadEquipmentByIdService {
  async execute({ id }: IReadEquipmentByIdRequest) {

    const equipment = await prismaClient.equipment.findUnique({
      where: {
        id
      }
    })

    if (!equipment) throw new AppError('Equipment not found', 404)

    return equipment
  }
}