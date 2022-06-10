import { hashSync } from "bcryptjs";
import User from "../../models/User";

interface IUpdateUserService {
  id: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string;
}

export default class UpdateUserService {
  static async execute({ id, email, password, phone, image }: IUpdateUserService) {
    const update = {} as any

    const user = await User.findById(id)

    if (email) update.email = email

    if (password !== undefined) { user.password = hashSync(password, 10) }

    if (phone !== undefined) { user.phone = phone }

    if (image !== undefined) { user.image = image }

    await user.save()

    const userUpdated = await User.findById(id)

    return userUpdated

  }
}