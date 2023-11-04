import { gym } from "@prisma/client";

export interface IGymsRepository {
  FindGymById(id_gym: string): Promise<gym | null>;
}
