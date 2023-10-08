import { ResourceNotFoundError } from "../errors/usersErrors";
import { usersRepository } from "../repository/prismaUsersRepository";

interface AuthenticateUserServiceRequest {
  id_user: string;
}

interface AuthenticateUserServiceResponse {
  id_user: string;
  user_name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export class GetUserProfileService {
  constructor(private UserRepository: usersRepository) {}

  async GetProfileUserById({
    id_user,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const userData = await this.UserRepository.getProfileById(id_user);

    if (!userData) {
      throw new ResourceNotFoundError();
    }

    return userData;
  }
}
