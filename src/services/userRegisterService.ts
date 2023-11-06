import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/Errors";
import { usersRepository } from "../repository/prismaRepository/prismaUsersRepository";
import { users } from "@prisma/client";

interface IVerifyAndCreateUserRequest {
  user_name: string;
  email: string;
  password: string;
}

export class UserRegisterService {
  constructor(private UsersRepository: usersRepository) {}

  async VerifyAndCreateUser({
    user_name,
    email,
    password,
  }: IVerifyAndCreateUserRequest): Promise<users> {
    const password_hash = await hash(password, 6);
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
