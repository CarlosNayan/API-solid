// src/tests/helpers/reset-db.ts
import { PrismaService } from "src/config/lib/prisma/prisma.service";

const prisma = new PrismaService();

if (!process.env.DATABASE_URL) {
	throw new Error("Please, provide a DATABASE_URL enviroment");
}

export default async () => {
	await prisma.$transaction([
		prisma.checkins.deleteMany(),
		prisma.gym.deleteMany(),
		prisma.users.deleteMany(),
	]);

	await prisma.$disconnect();
};
