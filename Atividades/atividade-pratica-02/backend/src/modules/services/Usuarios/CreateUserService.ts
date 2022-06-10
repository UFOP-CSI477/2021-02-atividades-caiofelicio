import { hash } from "bcryptjs"
import AppError from "../../../shared/errors/AppError"
import { prismaClient } from "../../../shared/infra/database/prismaClient"
import { fieldsToReturn } from "../../../utils/fieldsToReturn"

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
}

export default class CreateUserService {

  async execute({ name, email, password, is_admin }: ICreateUserRequest) {

    if (!name) throw new AppError("Name is required", 400)

    if (!email) throw new AppError("Email is required", 400)

    const emailExists = await prismaClient.user.findUnique({ where: { email } })

    if (emailExists) throw new AppError("Email already exists", 409)

    if (!password) throw new AppError("Password is required", 400)

    const encryptedPassword = await hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        is_admin: is_admin || false
      },
      select: fieldsToReturn
    })

    return user

  }

}