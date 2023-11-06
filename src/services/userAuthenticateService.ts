import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/Errors";
import { usersRepository } from "../repository/usersRepository";
import { users } from "@prisma/client";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export class UserAuthenticateService {
  constructor(private UserRepository: usersRepository) {}

  async AuthenticateUser({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<users> {
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
