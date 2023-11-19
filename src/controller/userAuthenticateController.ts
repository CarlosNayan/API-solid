import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserService } from "../factories/makeFactorieUsers";


export async function AuthenticateUser(req: FastifyRequest, res: FastifyReply) {
  const authenticateUserVerifyBody = z.object({
    email: z.string(),
    password: z.string(),
  });
  
  const { email, password } = authenticateUserVerifyBody.parse(req.body);
  
  const authenticateUserService = makeAuthenticateUserService();

  try {
    const user = await authenticateUserService.AuthenticateUser({
      email,
      password,
    });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id_user,
        },
      }
    );

    return res.status(200).send({ token: token });
  } catch (err) {
    throw err;
  }
}
