import { gym } from "@prisma/client";
import { IGymsRepository } from "../prismaRepository/prismaGymRepository";

export class InMemoryGymsRepository implements IGymsRepository {
  public items: gym[] = [];

  async FindGymById(id_gym: string) {
    const gymData = this.items.find((item) => item.id_gym === id_gym);

    if (!gymData) {
      return null;
    }

    return gymData;
  }
}
