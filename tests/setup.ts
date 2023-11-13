// src/tests/helpers/setup.ts

import { PrismaClient } from "@prisma/client";
import { beforeEach } from 'vitest';

const prisma = new PrismaClient();

if(!process.env.DATABASE_URL){
  throw new Error('Please, provide a DATABASE_URL enviroment')
}

beforeEach(async () => {
	console.log('rodou')
    await prisma.$transaction([
		prisma.checkins.deleteMany(),
		prisma.gym.deleteMany(),
		prisma.users.deleteMany(),
	  ]);
})
