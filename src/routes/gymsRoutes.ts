import { FastifyInstance } from "fastify";
import { nearbyGyms } from "../controller/gymsNearbyController";
import { createGym } from "../controller/gymsRegisterController";
import { searchGyms } from "../controller/gymsSearchController";
import { verifyJWT } from "../middlewares/verifyJWT";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGyms);
  app.get("/gyms/nearby", nearbyGyms);

  app.post("/gyms/create", createGym);
}
