import { hashSync } from "bcryptjs";
import AppError from "../../../shared/errors/AppError";
import { prismaClient } from "../../../shared/infra/database/prismaClient";
import { fieldsToReturn } from "../../../utils/fieldsToReturn";

interface IUpdateUserRequest {
  email: string;
  password: string;
  userId: string;
}

export default class UpdateUserService {
  async execute({ email, password, userId }: IUpdateUserRequest) {

    const fieldsToUpdate = {}

    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!user) throw new AppError("User not found", 404);

    if (!email && !password) return

    if (email) {
      const userAlreadyExists = await prismaClient.user.findUnique({ where: { email } })

      if (userAlreadyExists) throw new AppError('User already exists', 409)

      Object.assign(fieldsToUpdate, { email })
    }

    if (password) {
      Object.assign(fieldsToUpdate, { password: hashSync(password, 10) })
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      const user = await prismaClient.user.update({
        where: {
          id: userId
        },
        data: fieldsToUpdate,
        select: fieldsToReturn
      })

      return user

    }
  }
}