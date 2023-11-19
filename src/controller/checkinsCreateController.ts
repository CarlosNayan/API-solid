import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateCheckinsServices } from "../factories/makeFactorieCheckins";

export default async function createCheckin(
  req: FastifyRequest,
  res: FastifyReply
) {
  const createCheckinVerifyBody = z.object({
    id_gym: z.coerce.string().uuid(),
    user_latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    user_longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });
  const {  id_gym, user_latitude, user_longitude } =
    createCheckinVerifyBody.parse(req.body);

  const checkinUserService = makeCreateCheckinsServices();

  await checkinUserService.CreateCheckinUser({
    id_user: req.user.sub,
    id_gym,
    user_latitude,
    user_longitude,
  });

  return res.status(201).send("Academia criada com sucesso!!");
}
