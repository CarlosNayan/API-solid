import { gym } from "@prisma/client";
import { IGymsRepository } from "../types/RepositoryInterfaces/IGymRepository";
import { ISearchGymRequest } from "../types/ServicesInterfaces/IGymServices";

export class GymsSearchService {
  constructor(private UsersRepository: IGymsRepository) {}

  async SearchGym({ query, page }: ISearchGymRequest): Promise<gym[]> {
    const gymsFound = this.UsersRepository.SearchGym(query, page ?? 1);

    return gymsFound;
  }
}
