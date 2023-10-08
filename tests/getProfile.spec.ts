import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../src/errors/usersErrors";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { GetUserProfileService } from "../src/services/profileUserService";

let usersInMemoryRepository: InMemoryUserRepository;
let authServices: GetUserProfileService;

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    authServices = new GetUserProfileService(usersInMemoryRepository);
  });

  it("should be able to login", async () => {
    const createdUser = await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    const user = await authServices.GetProfileUserById({
		id_user: createdUser.id_user
    });

    expect(user.user_name).toEqual("Jhon Doe");
  });

  it("should not be able to login with wrong id", async () => {
    const createdUser = await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() => authServices.GetProfileUserById({
		id_user: 'non-exists-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  });
});
