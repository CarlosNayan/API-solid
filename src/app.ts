import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "./errors/Errors";
import { userRoutes } from "./routes/userRoutes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { gymsRoutes } from "./routes/gymsRoutes";
import { checkinsRoutes } from "./routes/checkinsRoutes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);
app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkinsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }
  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send(error);
  }
  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send(error);
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
