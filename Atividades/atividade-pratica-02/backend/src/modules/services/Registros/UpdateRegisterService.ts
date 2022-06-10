import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";
import { checkDate } from "../../../utils/checkDate";

interface IUpdateRegisterRequest {
  id: string;
  description: string;
  limit: string;
  type: number;
}

export default class UpdateRegisterService {
  async execute({ id, description, limit, type }: IUpdateRegisterRequest) {

    const fieldsToUpdate = {}

    const registerExists = await prismaClient.register.findUnique({ where: { id } })

    if (!registerExists) throw new AppError("Register not found", 404)

    if (description) Object.assign(fieldsToUpdate, { description })

    if (limit) {
      const limitVerified = checkDate(limit);

      if (limitVerified.getTime() <= registerExists.limit.getTime())
        throw new AppError("Limit must be greater than current limit", 400)

      Object.assign(fieldsToUpdate, { limit: limitVerified })
    }

    if (type) {
      if (type < 1 || type > 3) throw new AppError("Type must be 1 - preventive, 2 - corrective or 3 - urgent", 400);
      Object.assign(fieldsToUpdate, { type })
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      const register = await prismaClient.register.update({
        where: { id },
        data: fieldsToUpdate
      })
      return register
    }
  }
}