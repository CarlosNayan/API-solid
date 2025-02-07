import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "src/config/lib/prisma/prisma.module";
import { AuthModule } from "src/modules/auth/auth.module";
import * as request from "supertest";
import createAndAuthenticateUser from "test/utils/createAndAuthenticateUser";
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
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to refresh", async () => {
		const { refresh_token } = await createAndAuthenticateUser();

		const response = await request(app.getHttpServer())
			.patch("/auth/refresh")
			.send({
				refresh_token,
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			access_token: expect.any(String),
			refresh_token: expect.any(String),
		});
	});

	it("Professional /auth/refresh (POST Unauthorized without token)", async () => {
		const response = await request(app.getHttpServer()).patch("/auth/refresh");

		expect(response.statusCode).toEqual(401);
		expect(response.body.message).toEqual("Unauthorized");
	});

	it("Professional /auth/refresh (POST Unauthorized with invalid token)", async () => {
		const response = await request(app.getHttpServer())
			.patch("/auth/refresh")
			.send({
				refresh_token: "invalidToken",
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body.message).toEqual("Unauthorized");
	});
});
