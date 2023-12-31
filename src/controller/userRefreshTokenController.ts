import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserService } from "../factories/makeFactorieUsers";

export async function RefreshToken(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true });

  const token = await res.jwtSign(
    { role: req.user.role },
    {
      sign: {
        sub: req.user.sub,
      },
    }
  );

  const refreshToken = await res.jwtSign(
    { role: req.user.role },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return res
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token: token });
}
