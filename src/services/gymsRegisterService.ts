import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/prismaRepository/prismaGymRepository";

interface IRegisterGymRequest {
  gym_name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

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
