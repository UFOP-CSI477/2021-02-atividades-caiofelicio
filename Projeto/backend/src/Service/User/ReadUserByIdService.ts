import AppError from "../../errors/AppError";
import User from "../../models/User";

export default class ReadUserByIdService {
  static async execute(id: string) {

    if (!id) throw new AppError("User id is required", 400);

    const user = await User.findById(id).select("-password");

    if (!user) throw new AppError("User not found", 404);

    return user;
  }
}
