import AppError from "../../../shared/errors/AppError"
import { prismaClient } from "../../../shared/infra/database/prismaClient"
import { fieldsToReturn } from "../../../utils/fieldsToReturn"

interface IReadUserByIdRequest {
  id: string;
}

export default class ReadUserByIdService {
  async execute({ id }: IReadUserByIdRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      },
      select: fieldsToReturn
    })

    if (!user) throw new AppError('User not found', 404)

    return user
  }
}