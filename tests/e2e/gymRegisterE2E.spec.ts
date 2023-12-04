import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";

describe("gym register e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to resgister a gym", async () => {
    const { token } = await createAndAuthenticateUser(true);

    const response = await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gym_name: "Ignite gym",
        description: "Some description",
        phone: "5599999999",
        latitude: -1.439582,
        longitude: -48.4616274,
      });

    expect(response.statusCode).toEqual(201);
  });
});
