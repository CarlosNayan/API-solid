import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "src/config/lib/prisma/prisma.module";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { CheckinsModule } from "src/modules/checkins/checkins.module";
import * as request from "supertest";
import createAndAuthenticateUser from "test/utils/createAndAuthenticateUser";
import resetDb from "test/utils/resetDb";

describe("checkin validate e2e", () => {
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

	it("should be able to validate a checkin", async () => {
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

		let checkIn = await repo.checkins.create({
			data: {
				id_gym: gym.id_gym,
				id_user: user.id_user,
			},
		});

		await request(app.getHttpServer())
			.patch(`/checkins/${checkIn.id_checkin}/validate`)
			.set("Authorization", `Bearer ${access_token}`)
			.send({
				id_gym: checkIn.id_gym,
				user_latitude: -1.439582,
				user_longitude: -48.4616274,
			});

		checkIn = await repo.checkins.findFirstOrThrow();

		expect(checkIn.validated_at).toEqual(expect.any(Date));
	});
});
