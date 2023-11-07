import { users } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/Errors";
import { IUsersRepository } from "../types/RepositoryInterfaces/IUsersRepository";
import { IGetUserProfileRequest } from "../types/ServicesInterfaces/IUserService";

export class UserProfileService {
  constructor(private UserRepository: IUsersRepository) {}

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
