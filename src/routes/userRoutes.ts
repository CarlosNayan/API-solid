import { FastifyInstance } from "fastify";
import { VerifyAndCreateUser } from "../controller/userRegisterController";
import { AuthenticateUser } from "../controller/userAuthenticateController";
import Profile from "../controller/userProfileController";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users/create", VerifyAndCreateUser)
  app.post("/users/login", AuthenticateUser)

  app.get("/users/me", Profile)
}
