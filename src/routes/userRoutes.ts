import { FastifyInstance } from "fastify";
import { VerifyAndCreateUser } from "../controller/userController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users/create", VerifyAndCreateUser);
}
