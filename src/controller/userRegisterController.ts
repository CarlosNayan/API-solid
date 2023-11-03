import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserServices } from "../factories/makeFactorieUsers";

const userServices = makeRegisterUserServices();

export async function VerifyAndCreateUser(
  req: FastifyRequest,
  res: FastifyReply
) {
  const registerUserVerifyBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerUserVerifyBody.parse(req.body);

  try {
    await userServices.VerifyAndCreateUser({ name, email, password });
  } catch (err) {
    throw err;
  }

  return res.status(201).send("Usuário criado com sucesso!!");
}
