import bcryptjs from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/Errors";
import { IUsersRepository } from "../types/RepositoryInterfaces/IUsersRepository";
import { users } from "@prisma/client";
import { IVerifyAndCreateUserRequest } from "../types/ServicesInterfaces/IUserService";

export class UserRegisterService {
  constructor(private UsersRepository: IUsersRepository) {}

  async VerifyAndCreateUser({
    user_name,
    email,
    password,
  }: IVerifyAndCreateUserRequest): Promise<users> {
    const password_hash = await bcryptjs.hash(password, 6);
    const emailAlreadyExists = this.UsersRepository.UserEmailVerify(email);

    if (await emailAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const register = this.UsersRepository.CreateUser({
      user_name,
      email,
      password_hash,
    });

    return register;
  }
}
