import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcryptjs";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { AuthModule } from "src/modules/auth/auth.module";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { PrismaModule } from "src/config/lib/prisma/prisma.module";

export default async function createAndAuthenticateUser(
	email = "user@test.com"
) {
	const repo = new PrismaService();

	await repo.users.create({
		data: {
			user_name: "Jhon Doe",
			email,
			password_hash: await hash("123456", 6),
		},
	});

	let app: INestApplication;

	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [PrismaModule, AuthModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();

	const req: any = await request(app.getHttpServer()).post("/auth").send({
		email,
		password: "123456",
	});
	repo.$disconnect();

	return req.body as { access_token: string; refresh_token: string };
}
