import { Request, Response } from "express"
import ReadPetsService from "../../Service/Pet/ReadPetsService";

export default class ReadPetsController {
  static async handle(req: Request, res: Response) {
    const pets = await ReadPetsService.execute();

    return res.status(200).json(pets);
  }
}