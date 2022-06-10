import { prismaClient } from "../../../shared/infra/database/prismaClient"
import { fieldsToReturn } from "../../../utils/fieldsToReturn"


export default class ReadUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: fieldsToReturn,
      orderBy: {
        name: "asc"
      }
    })
    return users
  }
}