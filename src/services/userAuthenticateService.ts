import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/Errors";
import { usersRepository } from "../repository/prismaRepository/prismaUsersRepository";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  id_user: string;
  user_name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export class UserAuthenticateService {
  constructor(private UserRepository: usersRepository) {}

  async AuthenticateUser({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.UserRepository.UserEmailVerify(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
