import AppError from "../../../shared/errors/AppError"
import { prismaClient } from "../../../shared/infra/database/prismaClient"

interface IDeleteUserRequest {
  id: string;
}

export default class DeleteUserService {
  async execute({ id }: IDeleteUserRequest) {

    const user = await prismaClient.user.findUnique({ where: { id } })

    if (!user) throw new AppError('User not found', 404)

    await prismaClient.user.delete({
      where: {
        id
      }
    })
    return
  }
}