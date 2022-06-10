import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";

interface IReadRegisterByIdRequest {
  id: string;
}

export default class ReadRegisterByIdService {
  async execute({ id }: IReadRegisterByIdRequest) {
    const register = await prismaClient.register.findUnique({ where: { id } });

    if (!register) throw new AppError("Register not found", 404);

    return register;
  }
}