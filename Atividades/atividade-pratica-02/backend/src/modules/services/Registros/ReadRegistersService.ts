import { prismaClient } from '../../../shared/infra/database/prismaClient';

export default class ReadRegistersService {
  async execute() {
    const registers = await prismaClient.register.findMany({
      include: {
        equipment: true,
        user: true,
      },
      orderBy: {
        limit: 'asc',
      },
    });

    registers.forEach((register) => delete register.equipamentId);

    return registers;
  }
}
