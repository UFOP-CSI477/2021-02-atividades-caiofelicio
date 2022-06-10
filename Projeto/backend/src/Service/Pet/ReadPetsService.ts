import Pet from "../../models/Pet";

export default class ReadPetsService {
  static async execute() {
    const pets = await Pet.find();

    return pets;
  }
}