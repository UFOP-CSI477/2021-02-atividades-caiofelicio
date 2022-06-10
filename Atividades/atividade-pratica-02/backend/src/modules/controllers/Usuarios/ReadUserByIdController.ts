import { Request, Response } from "express";
import ReadUserByIdService from "../../services/Usuarios/ReadUserById";

export default class ReadUserByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const readUserByIdService = new ReadUserByIdService();

    const user = await readUserByIdService.execute({ id });

    return res.status(200).json(user);
  }

}