import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserServices } from "../factories/makeFactorieUsers";

const userServices = makeRegisterUserServices();

export async function VerifyAndCreateUser(
  req: FastifyRequest,
  res: FastifyReply
) {
  const registerUserVerifyBody = z.object({
    user_name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { user_name, email, password } = registerUserVerifyBody.parse(req.body);

  try {
    await userServices.VerifyAndCreateUser({ user_name, email, password });
  } catch (err) {
    throw err;
  }

  return res.status(201).send("Usuário criado com sucesso!!");
}
