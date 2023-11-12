import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../resetDb";
import request from "supertest";

describe("user register e2e", () => {
  beforeEach(async () => {
    await app.ready();
    await resetDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to resgister", async () => {
    const response = await request(app.server).post("/users/create").send({
      user_name: "Carlos Nayan",
      email: "carlosnayan@gmail.com",
      password: "123456",
    });


	expect(response.statusCode).toEqual(201)
  });

});
