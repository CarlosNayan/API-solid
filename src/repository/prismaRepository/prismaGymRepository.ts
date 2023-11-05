import { Prisma, gym } from "@prisma/client";

export interface IGymsRepository {
  CreateGym(data: Prisma.gymCreateInput): Promise<gym>;
  FindGymById(id_gym: string): Promise<gym | null>;
}
