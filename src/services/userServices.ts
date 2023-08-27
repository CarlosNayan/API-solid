import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

interface RegisterUserVerifyRequest {
  name: string;
  email: string;
  password: string;
}

export class UserServices {
  constructor(private usersRepository: any) {}

  async VerifyAndCreateUser({
    name,
    email,
    password,
  }: RegisterUserVerifyRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = this.usersRepository.UserEmailVerify(email);

    if (await userWithSameEmail) {
      throw new Error("E-mail ja cadastrado");
    }

    const register = this.usersRepository.CreateUser({
      user_name: name,
      email: email,
      password_hash,
    });

    return register;
  }
}
