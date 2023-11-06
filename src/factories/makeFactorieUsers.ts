import { prismaUsersRepository } from "../repository/prismaRepository/prismaUsersRepository";
import { UserAuthenticateService } from "../services/userAuthenticateService";

export function makeRegisterUserServices() {
  const UsersRepository = new prismaUsersRepository();
  const userServices = new UserAuthenticateService(UsersRepository);

  return userServices;
}

export function makeAuthenticateUserService() {
  const UsersRepository = new prismaUsersRepository();
  const authenticateUseCase = new UserAuthenticateService(UsersRepository);

  return authenticateUseCase;
}
