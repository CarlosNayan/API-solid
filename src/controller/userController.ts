import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserServices } from "../services/userServices";
import { UserAlreadyExistsError } from "../errors/usersErrors";

const userServices = new UserServices();

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
  } catch (err: any) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send(err);
    }

    throw err
  }

  return res.status(201).send("Usuário criado com sucesso!!");
}
