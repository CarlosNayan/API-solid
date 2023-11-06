import { Prisma, gym } from "@prisma/client";

export interface IGymsRepository {
  CreateGym(data: Prisma.gymCreateInput): Promise<gym>;
  SearchGymsNearby(user_latitude: number, user_longitude: number): Promise<gym[]>;
  SearchGym(query: string, page: number): Promise<gym[]>;
  FindGymById(id_gym: string): Promise<gym | null>;
}
