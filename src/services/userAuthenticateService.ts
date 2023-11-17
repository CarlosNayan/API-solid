import { InvalidCredentialsError } from "../errors/Errors";
import { IUsersRepository } from "../types/RepositoryInterfaces/IUsersRepository";
import { users } from "@prisma/client";
import { IAuthenticateUserRequest } from "../types/ServicesInterfaces/IUserService";
import bcryptjs from "bcryptjs";

export class UserAuthenticateService {
  constructor(private UserRepository: IUsersRepository) {}

  async AuthenticateUser({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<users> {
    const user = await this.UserRepository.UserEmailVerify(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await bcryptjs.compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
