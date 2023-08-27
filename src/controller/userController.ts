import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserServices } from "../services/userServices";
import { PrismaUsersRepository } from "../repository/PrismaUsersRepository";

const UsersRepository = new PrismaUsersRepository();
const userServices = new UserServices(UsersRepository);

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
    return res.status(409).send("Email já cadastrado por outro usuário");
  }

  return res.status(201).send("Usuário criado com sucesso!!");
}
