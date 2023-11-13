import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../resetDb";
import request from "supertest";

describe("user profile e2e", () => {
  beforeEach(async () => {
    await app.ready();
    await resetDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users/create").send({
      user_name: "Jhon Doe",
      email: "user@email.com",
      password: "123456",
    });

    const response = await request(app.server).post("/users/login").send({
      email: "user@email.com",
      password: "123456",
    });

    const token = response.body.token;

    const userData = await request(app.server)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(userData.statusCode).toEqual(200);
    expect(userData.body.user).toEqual(
      expect.objectContaining({ user_name: "Jhon Doe" }),
    );
  });
});
