import { usersRepository } from "../repository/prismaRepository/prismaUsersRepository";
import { UserAuthenticateService } from "../services/userAuthenticateService";
import { UserRegisterServices } from "../services/userRegisterService";

export function makeRegisterUserServices() {
  const UsersRepository = new usersRepository();
  const userServices = new UserRegisterServices(UsersRepository);

  return userServices;
}

export function makeAuthenticateUserService() {
  const UsersRepository = new usersRepository();
  const authenticateUseCase = new UserAuthenticateService(UsersRepository);

  return authenticateUseCase;
}
