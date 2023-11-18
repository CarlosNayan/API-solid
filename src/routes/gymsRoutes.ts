import { FastifyInstance } from "fastify";
import { auth, verifyJWT } from "../middlewares/verifyJWT";
import { create } from "../controller/gymsRegisterController";
import { searchGyms } from "../controller/gymsSearchController";
import { nearbyGyms } from "../controller/gymsNearbyController";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGyms);
  app.get("/gyms/nearby", nearbyGyms);

  app.post("/gyms/create", create);
}
