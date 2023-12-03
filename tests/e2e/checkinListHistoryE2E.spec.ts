import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";
import { prisma } from "../../src/lib/prisma";

describe("checkin history e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list the history of check-ins", async () => {
    const { token } = await createAndAuthenticateUser();

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

    await prisma.checkins.createMany({
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

    const response = await request(app.server)
      .get("/checkins/history")
      .set("Authorization", `Bearer ${token}`)
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
