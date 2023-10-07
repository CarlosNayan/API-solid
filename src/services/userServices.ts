import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/usersErrors";
import { usersRepository } from "../repository/userRepository";

const UsersRepository = new usersRepository();

interface RegisterUserVerifyRequest {
  name: string;
  email: string;
  password: string;
}

export class UserServices {

  async VerifyAndCreateUser({
    name,
    email,
    password,
  }: RegisterUserVerifyRequest) {
    const password_hash = await hash(password, 6);
    const emailAlreadyExists = UsersRepository.UserEmailVerify(email);

    if (await emailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const register = UsersRepository.CreateUser({
      user_name: name,
      email: email,
      password_hash,
    });

    return register;
  }
}
