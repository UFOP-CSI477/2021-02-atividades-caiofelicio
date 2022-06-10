import { Request, Response } from "express";
import CreatePetService from "../../Service/Pet/CreatePetService";

export default class CreatePetController {
  static async handle(req: Request, res: Response) {
    const { name, age, type } = req.body;
    const images = req.files ? req.files : undefined
    const id = req.userId

    const pet = await CreatePetService.execute({ id, name, age, type, petImages: images });

    return res.status(200).json(pet);
  }
}