import * as request from "supertest";
import { CheckinsModule } from "src/modules/checkins/checkins.module";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { PrismaModule } from "src/config/lib/prisma/prisma.module";
import resetDb from "test/utils/resetDb";
import createAndAuthenticateUser from "test/utils/createAndAuthenticateUser";
import { PrismaService } from "src/config/lib/prisma/prisma.service";

describe("checkin history e2e", () => {
	let app: INestApplication;

	beforeEach(async () => {
		await resetDb();
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule, CheckinsModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to list the history of check-ins", async () => {
		const { access_token } = await createAndAuthenticateUser();

		const repo = new PrismaService();

		const user = await repo.users.findFirstOrThrow();

		const gym = await repo.gym.create({
			data: {
				gym_name: "Ignite gym",
				description: "Some description",
				phone: "5599999999",
				latitude: -1.439582,
				longitude: -48.4616274,
			},
		});

		await repo.checkins.createMany({
			data: [
				{
					id_gym: gym.id_gym,
					id_user: user.id_user,
				},
				{
					id_gym: gym.id_gym,
					id_user: user.id_user,
				},
			],
		});

		const response = await request(app.getHttpServer())
			.get("/checkins/history")
			.set("Authorization", `Bearer ${access_token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual([
			expect.objectContaining({
				id_gym: gym.id_gym,
				id_user: user.id_user,
			}),
			expect.objectContaining({
				id_gym: gym.id_gym,
				id_user: user.id_user,
			}),
		]);
	});
});
