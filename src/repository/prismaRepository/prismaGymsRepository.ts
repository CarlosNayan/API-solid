import { Prisma, gym } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IGymsRepository } from "../../types/RepositoryInterfaces/IGymRepository";
import { prisma } from "../../lib/prisma";

export class prismaGymsRepository implements IGymsRepository {
  async CreateGym(data: Prisma.gymCreateInput) {
    const gym = prisma.gym.create({
      data,
    });

    return gym;
  }

  async SearchGymsNearby(user_latitude: number, user_longitude: number) {
    const nearbyGyms = prisma.$queryRaw<gym[]>`
		SELECT * from gyms
		WHERE ( 6371 * acos( cos( radians(${user_latitude}) ) 
		* cos( radians( latitude ) ) 
		* cos( radians( longitude ) - radians(${user_longitude}) ) + sin( radians(${user_latitude}) ) 
		* sin( radians( latitude ) ) ) ) <= 10
		`;

    return nearbyGyms;
  }

  async SearchGym(query: string, page: number) {
    const gym = prisma.gym.findMany({
      where: {
        gym_name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gym;
  }

  async FindGymById(id_gym: string) {
    const gym = prisma.gym.findUnique({
      where: {
        id_gym,
      },
    });

    return gym;
  }
}
