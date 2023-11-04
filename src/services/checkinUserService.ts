import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";

interface CheckinUserRequest {
  id_user: string;
  id_gym: string;
}

interface CheckinUserServiceResponse {
  id_checkin: string;
  id_user: string;
  id_gym: string;
  created_at: Date;
  validated_at: Date | null;
}

export class CheckinUserService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CreateCheckinUser({
    id_user,
    id_gym,
  }: CheckinUserRequest): Promise<CheckinUserServiceResponse> {
    const checkInOnSameDay = await this.checkInsRepository.FindCheckinByIdOnDate(
      id_user,
      new Date()
    )

    if(checkInOnSameDay){
      throw new Error()
    }

    const createCheckin = await this.checkInsRepository.CreateCheckin({
      id_user,
      id_gym,
    });

    return createCheckin;
  }
}
