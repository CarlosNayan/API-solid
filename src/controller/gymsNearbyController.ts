import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  makeNearbyGymsServices,
  makeSearchGymsServices,
} from "../factories/makeFactorieGyms";

export async function nearbyGyms(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymVerifyBody = z.object({
    user_latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    user_longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { user_latitude, user_longitude } = nearbyGymVerifyBody.parse(
    req.query
  );

  const nearbyGymsSearch = makeNearbyGymsServices();

  const gymsArray = nearbyGymsSearch.GymsNearby({
    user_latitude,
    user_longitude,
  });

  return res.status(200).send(gymsArray);
}
