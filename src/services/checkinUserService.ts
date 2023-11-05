import {
  MaxDistanceError,
  ResourceNotFoundError,
  MaxNumberOfCheckInsError,
} from "../errors/Errors";
import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";
import { IGymsRepository } from "../repository/prismaRepository/prismaGymRepository";
import { getDistanceBetweenCoordinates } from "../utils/getDistanceBetweenCoordinates";

interface CheckinUserRequest {
  id_user: string;
  id_gym: string;
  user_latitude: number;
  user_longitude: number;
}

interface ICheckinUserHistoryRequest {
  id_user: string;
  page?: number;
}

interface CheckinUserServiceResponse {
  id_checkin: string;
  id_user: string;
  id_gym: string;
  created_at: Date;
  validated_at: Date | null;
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
  }: CheckinUserRequest): Promise<CheckinUserServiceResponse> {
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

  async ListAllCheckinsHistoryOfUser({
    id_user,
    page,
  }: ICheckinUserHistoryRequest) {
    const checkinsHistory =
      await this.checkInsRepository.ListAllCheckinsHistoryOfUser(
        id_user,
        page ?? 1
      );

    return checkinsHistory;
  }
}
