import { Request, Response } from "express";
import ReadPetByIdService from "../../Service/Pet/ReadPetByIdservice";

export default class ReadPetByIdController {
  static async handle(req: Request, res: Response) {
    const { id } = req.params

    const pet = await ReadPetByIdService.execute({ id })

    return res.status(200).json(pet)

  }
}