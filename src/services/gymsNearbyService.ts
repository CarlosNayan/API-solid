import { gym } from "@prisma/client";
import { IGymsRepository } from "../types/RepositoryInterfaces/IGymRepository";
import { IGymsNearbyRequest } from "../types/ServicesInterfaces/IGymServices";

export class GymsNearbyService {
  constructor(private UsersRepository: IGymsRepository) {}

  async GymsNearby({
    user_latitude,
    user_longitude,
  }: IGymsNearbyRequest): Promise<gym[]> {
    const gymsFound = this.UsersRepository.SearchGymsNearby(
      user_latitude,
      user_longitude
    );

    return gymsFound;
  }
}
