import AppError from "../../errors/AppError";
import Pet from "../../models/Pet";
import User from "../../models/User";

interface ICreatePetService {
  id: string
  name: string;
  age: number;
  type: string;
  petImages: any;
}

export default class CreatePetService {
  static async execute({ id, name, age, type, petImages }: ICreatePetService) {

    if (!name) throw new AppError("O nome do pet é obrigatório", 400);

    if (!age) throw new AppError("A idade do pet é obrigatória", 400);

    if (!type) throw new AppError("O tipo do pet é obrigatório", 400);

    if (!petImages) throw new AppError("Envie pelo menos 1 foto do pet", 400);

    const images = petImages.map((image: { location: string; }) => image.location)

    const user = await User.findById(id, {
      name: 1,
      phone: 1,
    });

    const pet = await Pet.create({ name, age, type, images, user })

    await pet.save()

    return pet
  }
}