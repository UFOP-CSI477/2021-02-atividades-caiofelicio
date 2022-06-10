import { Request, Response } from "express"
import ReadUserByIdService from "../../Service/User/ReadUserByIdService";

export default class ReadUserByIdController {
  static async handle(req: Request, res: Response) {
    const { id } = req.params;

    const user = await ReadUserByIdService.execute(id);

    return res.status(200).json(user);
  }
}