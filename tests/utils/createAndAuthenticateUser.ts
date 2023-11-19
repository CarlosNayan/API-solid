import request from "supertest";
import { app } from "../../src/app";

export default async function createAndAuthenticateUser() {
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

  return { token };
}
