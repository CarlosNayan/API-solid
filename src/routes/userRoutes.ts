import { FastifyInstance } from "fastify";
import { VerifyAndCreateUser } from "../controller/userRegisterController";
import { AuthenticateUser } from "../controller/userAuthenticateController";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/create", VerifyAndCreateUser)
  app.post("/users/login", AuthenticateUser)
}
