import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../utils/resetDb";

describe("user authenticate e2e", () => {
  beforeEach(async () => {
    await resetDb();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users/create").send({
      user_name: "Jhon Doe",
      email: "user@email.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/users/login").send({
      email: "user@email.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
