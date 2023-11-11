import { prismaUsersRepository } from "../repository/prismaRepository/prismaUsersRepository";
import { UserAuthenticateService } from "../services/userAuthenticateService";
import { UserProfileService } from "../services/userProfileService";
import { UserRegisterService } from "../services/userRegisterService";

export function makeRegisterUserServices() {
  const usersRepository = new prismaUsersRepository();
  const userRegisterServices = new UserRegisterService(usersRepository);

  return userRegisterServices;
}

export function makeAuthenticateUserService() {
  const usersRepository = new prismaUsersRepository();
  const authenticateUseCase = new UserAuthenticateService(usersRepository);

  return authenticateUseCase;
}

export function makeGetUserProfileService() {
  const usersRepository = new prismaUsersRepository();
  const userProfileService = new UserProfileService(usersRepository);

  return userProfileService;
}
