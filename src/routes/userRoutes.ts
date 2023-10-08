import { FastifyInstance } from "fastify";
import { AuthenticateUser, VerifyAndCreateUser } from "../controller/userController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users/create", VerifyAndCreateUser)
  app.post("/users/login", AuthenticateUser)
}
