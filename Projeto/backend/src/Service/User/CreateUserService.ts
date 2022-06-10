import AppError from "../../errors/AppError";
import User from "../../models/User";
import { hash } from "bcryptjs";
import { generateToken } from "../../utils/generateToken";

interface ICreateUserService {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default class CreateUserService {
  static async execute({ name, email, password, phone }: ICreateUserService) {

    if (!name) throw new AppError("Name is required", 400);

    if (!email) throw new AppError("Email is required", 400);

    if (!password) throw new AppError("Password is required", 400);

    if (!phone) throw new AppError("Phone is required", 400);

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) throw new AppError("User already exists", 409)

    // const hashPassword = await hash(password, 10)

    const beforeCreateUser = await User.create({
      name,
      email,
      password: await hash(password, 10),
      phone,
      image: "https://ui-avatars.com/api/?name=" + name.split(" ")[0]
    })

    const user = await beforeCreateUser.save()

    const token = generateToken({ id: user._id.toString(), name: user.name })

    return {
      token,
      ...user
    }

  }
}