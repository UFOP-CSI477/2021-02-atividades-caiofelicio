import { Request, Response } from "express";
import ReadRegistersService from "../../services/Registros/ReadRegistersService";

export default class ReadRegistersController {
  async handle(request: Request, response: Response) {
    const readRegistersService = new ReadRegistersService()

    const registers = await readRegistersService.execute()

    return response.status(200).json(registers)
  }
}