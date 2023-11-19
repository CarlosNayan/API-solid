import { FastifyReply, FastifyRequest } from "fastify";
import { makeCountHistoryCheckinsServices } from "../factories/makeFactorieCheckins";

export async function countCheckins(req: FastifyRequest, res: FastifyReply) {

  const checkinsCountService = makeCountHistoryCheckinsServices();

  const checkinsCount = checkinsCountService.CountByUserId({
    id_user: req.user.sub
  });

  return res.status(200).send(checkinsCount);
}
