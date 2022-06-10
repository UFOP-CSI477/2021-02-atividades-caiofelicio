import { prismaClient } from "../../../shared/infra/database/prismaClient";

export default class ReadEquipmentsService {
  async execute() {
    const equipments = await prismaClient.equipment.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return equipments;
  }
}