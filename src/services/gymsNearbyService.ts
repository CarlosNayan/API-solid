import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/gymRepository";

interface IGymsNearbyRequest {
  user_latitude: number;
  user_longitude: number;
}

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
