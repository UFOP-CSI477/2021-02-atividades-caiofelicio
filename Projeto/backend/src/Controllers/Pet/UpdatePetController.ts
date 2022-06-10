import { Request, Response } from "express";
import UpdatePetService from "../../Service/Pet/UpdatePetService";

export default class UpdatePetController {
  static async handle(req: Request, res: Response) {
    const { available } = req.body;
    const { id } = req.params;

    await UpdatePetService.execute({ id, available })

    return res.status(201).end();
  }
}