import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";

interface IReadRegistersByIdRequest {
  id: string;
}

export default class ReadRegistersByIdService {
  async execute({ id }: IReadRegistersByIdRequest) {

    const equipamentExists = await prismaClient.equipment.findUnique({ where: { id } })

    if (!equipamentExists) throw new AppError("Equipament not found", 404)

    const registers = await prismaClient.register.findMany({
      where: {
        equipamentId: id
      }
    })

    return registers
  }
}