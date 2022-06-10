import Pet from "../../models/Pet"
import AppError from "../../errors/AppError"

interface IReadPetByIdService {
  id: string;
}

export default class ReadPetByIdService {
  static async execute({ id }: IReadPetByIdService) {

    const pet = await Pet.findById(id)

    if (!pet) throw new AppError('Pet not found', 404)

    return pet
  }
}