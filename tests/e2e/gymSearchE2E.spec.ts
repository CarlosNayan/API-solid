import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";

describe("gym search e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(true);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gym_name: "Ignite gym",
        description: "Some description",
        phone: "5599999999",
        latitude: -1.439582,
        longitude: -48.4616274,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Ignite",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      expect.objectContaining({ gym_name: "Ignite gym" }),
    ]);
  });
});
