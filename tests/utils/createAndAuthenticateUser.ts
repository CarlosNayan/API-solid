import request from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

export default async function createAndAuthenticateUser(isAdmin = false) {
  await prisma.users.create({
    data: {
      user_name: "Jhon Doe",
      email: "user@email.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const response = await request(app.server).post("/users/login").send({
    email: "user@email.com",
    password: "123456",
  });

  const token = response.body.token;

  return { token };
}
