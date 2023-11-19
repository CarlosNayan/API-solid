import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  makeCreateCheckinsServices,
  makeValidateCheckinsServices,
} from "../factories/makeFactorieCheckins";

export default async function validateCheckin(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validateCheckinVerifyBody = z.object({
    id_checkin: z.string().uuid(),
  });
  const { id_checkin } = validateCheckinVerifyBody.parse(req.query);

  const checkinUserValidateService = makeValidateCheckinsServices();

  const ValidatedCheckin = await checkinUserValidateService.CreateCheckinUserValidate(id_checkin);

  return res.status(200).send(ValidatedCheckin);
}
