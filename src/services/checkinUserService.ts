import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/usersErrors";
import { usersRepository } from "../repository/prismaUsersRepository";
import { checkInsRepository } from "../repository/prismaCheckinsRepository";

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

  async CheckinUser({
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
