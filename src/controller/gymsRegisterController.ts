import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterGymsServices } from "../factories/makeFactorieGyms";

export async function createGym(req: FastifyRequest, res: FastifyReply) {
  const registerGymVerifyBody = z.object({
    gym_name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gym_name, description, phone, latitude, longitude } =
    registerGymVerifyBody.parse(req.body);

  const gymRegisterService = makeRegisterGymsServices();

  gymRegisterService.CreateGym({
    gym_name,
    description,
    phone,
    latitude,
    longitude,
  });

  return res.status(201).send("Academia criada com sucesso!!");
}
