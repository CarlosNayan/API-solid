import { FastifyInstance } from "fastify";
import { createGym } from "../controller/gymsRegisterController";
import { verifyJWT } from "../middlewares/verifyJWT";
import { historyCheckins } from "../controller/checkinListHistoryController";
import { countCheckins } from "../controller/checkinCountHistoryController";
import validateCheckin from "../controller/checkinUserValidateController";
import createCheckin from "../controller/checkinsCreateController";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/checkins/history", historyCheckins);
  app.get("/checkins/metrics", countCheckins);

  app.post("/checkins/create", createCheckin);
  app.patch("/checkins/:id_checkin/validate", validateCheckin);
}
