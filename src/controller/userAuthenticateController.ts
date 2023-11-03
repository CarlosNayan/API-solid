import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserService } from "../factories/makeFactorieUsers";

const authenticateUserService = makeAuthenticateUserService();

export async function AuthenticateUser(req: FastifyRequest, res: FastifyReply) {
  const authenticateUserVerifyBody = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateUserVerifyBody.parse(req.body);

  try {
    await authenticateUserService.AuthenticateUser({ email, password });
  } catch (err) {
    throw err;
  }

  return res.status(201).send(`Bem vindo(a)!!`);
}
