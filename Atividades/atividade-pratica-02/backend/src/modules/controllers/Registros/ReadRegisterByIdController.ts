import { Request, Response } from "express";
import ReadRegisterByIdService from "../../services/Registros/ReadRegisterByIdService";

export default class ReadRegisterByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const readRegisterByIdService = new ReadRegisterByIdService();

    const register = await readRegisterByIdService.execute({ id });

    return response.status(200).json(register);

  }
}
