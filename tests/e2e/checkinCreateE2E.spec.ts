import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";
import { prisma } from "../../src/lib/prisma";

describe("checkin create e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a checkin", async () => {
    const { token } = await createAndAuthenticateUser();

    const gym = await prisma.gym.create({
      data: {
        gym_name: "Ignite gym",
        description: "Some description",
        phone: "5599999999",
        latitude: -1.439582,
        longitude: -48.4616274,
      },
    });

    const response = await request(app.server)
      .post("/checkins/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id_gym: gym.id_gym,
        user_latitude: -1.439582,
        user_longitude: -48.4616274,
      });

    expect(response.statusCode).toEqual(201);
  });
});
