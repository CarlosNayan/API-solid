import { checkins } from "@prisma/client";
import {
  MaxDistanceError,
  MaxNumberOfCheckInsError,
  ResourceNotFoundError,
} from "../errors/Errors";
import { ICheckInsRepository } from "../repository/checkinsRepository";
import { IGymsRepository } from "../repository/gymRepository";
import { getDistanceBetweenCoordinates } from "../utils/getDistanceBetweenCoordinates";

interface ICheckinUserRequest {
  id_user: string;
  id_gym: string;
  user_latitude: number;
  user_longitude: number;
}

export class CheckinUserService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymRepository: IGymsRepository
  ) {}

  async CreateCheckinUser({
    id_user,
    id_gym,
    user_latitude,
    user_longitude,
  }: ICheckinUserRequest): Promise<checkins> {
    const gym = await this.gymRepository.FindGymById(id_gym);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: user_latitude, longitude: user_longitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    // distance in KM metric
    if (distance > 0.1) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay =
      await this.checkInsRepository.FindCheckinByIdOnDate(id_user, new Date());

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const createCheckin = await this.checkInsRepository.CreateCheckin({
      id_user,
      id_gym,
    });

    return createCheckin;
  }
}
