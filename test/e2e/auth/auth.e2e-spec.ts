import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcryptjs";
import { PrismaModule } from "src/config/lib/prisma/prisma.module";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { AuthModule } from "src/modules/auth/auth.module";
import * as request from "supertest";
import resetDb from "test/utils/resetDb";

describe("Professionals auth (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		await resetDb();
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule, AuthModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const repo = new PrismaService();
		await repo.users.create({
			data: {
				id_user: "98aac06b-a1ac-4dc4-9a2c-a1287ac818e7",
				user_name: "Jhon Doe",
				email: "user@test.com",
				password_hash: await hash("123456", 6),
				role: "ADMIN",
			},
		});
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to auth", async () => {
		const response = await request(app.getHttpServer()).post("/auth").send({
			email: "user@test.com",
			password: "123456",
		});

		expect(response.statusCode).toEqual(201);
	});
});
