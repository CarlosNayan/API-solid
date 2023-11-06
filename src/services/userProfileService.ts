import { users } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/Errors";
import { usersRepository } from "../repository/usersRepository";

interface IGetUserProfileRequest {
  id_user: string;
}

export class UserProfileService {
  constructor(private UserRepository: usersRepository) {}

  async GetProfileUserById({
    id_user,
  }: IGetUserProfileRequest): Promise<users> {
    const userData = await this.UserRepository.getProfileById(id_user);

    if (!userData) {
      throw new ResourceNotFoundError();
    }

    return userData;
  }
}
