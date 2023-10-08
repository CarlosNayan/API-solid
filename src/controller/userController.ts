import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserServices } from "../services/userServices";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "../errors/usersErrors";
import { usersRepository } from "../repository/prismaUsersRepository";
import { AuthenticateUserService } from "../services/authenticateUserService";
import { makeAuthenticateUserService, makeRegisterUserServices } from "../factories/makeFactorieUsers";

const userServices = makeRegisterUserServices()
const authenticateUserService = makeAuthenticateUserService()

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
