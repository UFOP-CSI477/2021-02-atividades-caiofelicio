import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";

interface IDeleteRegisterRequest {
  id: string;
}

export default class DeleteRegisterService {
  async execute({ id }: IDeleteRegisterRequest) {

    try {
      await prismaClient.register.delete({ where: { id } });
    } catch (error) {
      throw new AppError("Register not found", 404);
    }

    return;
  }
}