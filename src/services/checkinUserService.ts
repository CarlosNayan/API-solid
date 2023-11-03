import { checkInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";

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
  constructor(private checkInsRepository: checkInsRepository) {}

  async CreateCheckinUser({
    id_user,
    id_gym,
  }: CheckinUserRequest): Promise<CheckinUserServiceResponse> {
    const createCheckin = await this.checkInsRepository.CreateCheckin({
      id_user,
      id_gym,
    });

    return createCheckin;
  }
}
