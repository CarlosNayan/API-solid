import { Prisma, gym } from "@prisma/client";
import { IGymsRepository } from "../prismaRepository/prismaGymRepository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/getDistanceBetweenCoordinates";

export class InMemoryGymsRepository implements IGymsRepository {
  public items: gym[] = [];

  async CreateGym(data: Prisma.gymCreateInput): Promise<gym> {
    const gym = {
      id_gym: data.id_gym ?? randomUUID(),
      gym_name: data.gym_name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };
    this.items.push(gym);
    return gym;
  }

  async SearchGym(query: string, page: number): Promise<gym[]> {
    const gymsFiltered = this.items
      .filter((item) => item.gym_name.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20);

    return gymsFiltered;
  }

  async SearchGymsNearby(user_latitude: number, user_longitude: number): Promise<gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {latitude: user_latitude, longitude: user_longitude},
        {latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()}
      )

      return distance < 10
    })
  }

  async FindGymById(id_gym: string) {
    const gymData = this.items.find((item) => item.id_gym === id_gym);

    if (!gymData) {
      return null;
    }

    return gymData;
  }
}
