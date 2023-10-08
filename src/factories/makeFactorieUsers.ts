import { usersRepository } from "../repository/prismaUsersRepository";
import { AuthenticateUserService } from "../services/authenticateUserService";
import { UserServices } from "../services/userServices";

export function makeRegisterUserServices() {
	const UsersRepository = new usersRepository();
  const userServices = new UserServices(UsersRepository);

  return userServices
}

export function makeAuthenticateUserService() {
	const UsersRepository = new usersRepository();
	const authenticateUseCase = new AuthenticateUserService(UsersRepository);

  return authenticateUseCase
}

