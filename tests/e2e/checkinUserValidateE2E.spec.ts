import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";
import { prisma } from "../../src/lib/prisma";

describe("checkin validate e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a checkin", async () => {
    const { token } = await createAndAuthenticateUser(true);

    const user = await prisma.users.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        gym_name: "Ignite gym",
        description: "Some description",
        phone: "5599999999",
        latitude: -1.439582,
        longitude: -48.4616274,
      },
    });

    let checkIn = await prisma.checkins.create({
      data: {
        id_gym: gym.id_gym,
        id_user: user.id_user,
      },
    });

    await request(app.server)
      .patch(`/checkins/${checkIn.id_checkin}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        id_gym: checkIn.id_gym,
        user_latitude: -1.439582,
        user_longitude: -48.4616274,
      });

    checkIn = await prisma.checkins.findFirstOrThrow();

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
