import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import createAndAuthenticateUser from "../utils/createAndAuthenticateUser";
import resetDb from "../utils/resetDb";

describe("user profile e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser();

    const userData = await request(app.server)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(userData.statusCode).toEqual(200);
    expect(userData.body.user).toEqual(
      expect.objectContaining({ user_name: "Jhon Doe" })
    );
  });
});
