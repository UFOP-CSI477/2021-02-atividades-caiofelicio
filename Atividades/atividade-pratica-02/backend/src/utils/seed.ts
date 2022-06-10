import { faker } from '@faker-js/faker';
import { hashSync } from 'bcryptjs';
import { prismaClient } from '../shared/infra/database/prismaClient';

faker.setLocale('pt_BR');

const fakeUsers = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: hashSync('admin', 10),
    is_admin: true,
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    is_admin: false,
  },
];

const fakeEquipments = [
  {
    name: 'Computador',
  },
  {
    name: 'Impressora',
  }
]

export async function seeder() {
  await prismaClient.user.createMany({
    data: fakeUsers,
    skipDuplicates: true,
  });

  await prismaClient.equipment.createMany({
    data: fakeEquipments,
    skipDuplicates: true,
  })
}
