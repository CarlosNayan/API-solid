import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/prismaRepository/prismaGymRepository";

interface ISearchGymRequest {
  query: string;
  page?: number;
}

export class GymsSearchService {
  constructor(private UsersRepository: IGymsRepository) {}

  async SearchGym({ query, page }: ISearchGymRequest): Promise<gym[]> {
    const registerGym = this.UsersRepository.SearchGym(query, page ?? 1);

    return registerGym;
  }
}
