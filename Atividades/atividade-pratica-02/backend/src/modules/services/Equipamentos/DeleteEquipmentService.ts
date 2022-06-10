import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient"

interface IDeleteEquipmentRequest {
  id: string;
}

export default class DeleteEquipmentService {
  async execute({ id }: IDeleteEquipmentRequest) {

    const equipmentExists = await prismaClient.equipment.findUnique({ where: { id } })

    if (!equipmentExists) throw new AppError('Equipment not found', 404)

    const equipment = await prismaClient.equipment.delete({
      where: {
        id
      }
    })
    return
  }
}