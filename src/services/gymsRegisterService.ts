import { gym } from "@prisma/client";
import { IGymsRepository } from "../types/RepositoryInterfaces/IGymRepository";
import { IRegisterGymRequest } from "../types/ServicesInterfaces/IGymServices";

export class GymsRegisterService {
  constructor(private UsersRepository: IGymsRepository) {}

  async CreateGym({
    gym_name,
    description,
    phone,
    latitude,
    longitude,
  }: IRegisterGymRequest): Promise<gym> {
    const registerGym = this.UsersRepository.CreateGym({
      gym_name,
      description,
      phone,
      latitude,
      longitude,
    });

    return registerGym;
  }
}
