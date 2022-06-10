import AppError from "../../errors/AppError";
import Pet from "../../models/Pet";

interface IUpdatePetService {
  id: string;
  available: boolean;
}

export default class UpdatePetService {
  static async execute({ id, available }: IUpdatePetService) {
    const pet = await Pet.findById(id);

    if (!pet) throw new AppError("Pet não encontrado", 404);

    pet.available = available;

    await pet.save();

    return
  }
}