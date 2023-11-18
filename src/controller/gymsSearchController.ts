import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsServices } from "../factories/makeFactorieGyms";

export async function searchGyms(req: FastifyRequest, res: FastifyReply) {
  const registerGymVerifyBody = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = registerGymVerifyBody.parse(req.query);

  const gymSearch = makeSearchGymsServices();

  const gymsArray = gymSearch.SearchGym({
    query,
    page,
  });

  return res.status(200).send(gymsArray);
}
