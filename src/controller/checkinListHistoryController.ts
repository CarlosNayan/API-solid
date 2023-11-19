import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListHistoryCheckinsServices } from "../factories/makeFactorieCheckins";

export async function historyCheckins(req: FastifyRequest, res: FastifyReply) {
  const historyCheckinsVerifyBody = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckinsVerifyBody.parse(req.query);

  const checkinsSearchService = makeListHistoryCheckinsServices();

  const checkinsArray = await checkinsSearchService.ListAllCheckinsHistoryOfUser({
    id_user: req.user.sub,
    page,
  });

  return res.status(200).send(checkinsArray);
}
