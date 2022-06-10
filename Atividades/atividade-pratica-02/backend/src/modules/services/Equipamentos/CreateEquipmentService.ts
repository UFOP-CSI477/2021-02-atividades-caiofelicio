import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";

interface ICreateEquipmentRequest {
  name: string;
}

export default class CreateEquipmentService {
  async execute({ name }: ICreateEquipmentRequest) {

    if (!name) throw new AppError("Equipment name is required", 400);

    const equipmentExists = await prismaClient.equipment.findUnique({
      where: {
        name,
      }
    })

    if (equipmentExists) throw new AppError("Equipment already exists", 409);

    const equipment = await prismaClient.equipment.create({
      data: {
        name
      }
    })

    return equipment;

  }
}