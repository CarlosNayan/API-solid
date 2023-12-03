import { FastifyInstance } from "fastify";
import { VerifyAndCreateUser } from "../controller/userRegisterController";
import { AuthenticateUser } from "../controller/userAuthenticateController";
import Profile from "../controller/userProfileController";
import { auth } from "../middlewares/verifyJWT";
import { RefreshToken } from "../controller/userRefreshTokenController";


export async function userRoutes(app: FastifyInstance) {
  app.post("/users/create", VerifyAndCreateUser);
  app.post("/users/login", AuthenticateUser);
  
  app.patch("/token/refresh", RefreshToken);

  app.get("/users/me", auth, Profile);
}
