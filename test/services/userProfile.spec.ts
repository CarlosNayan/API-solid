import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../src/errors/Errors";
import { InMemoryUserRepository } from "../../src/repository/inMemoryRepository/inMemoryUserRepository";
import { UserProfileService } from "../../src/services/userProfileService";

let usersInMemoryRepository: InMemoryUserRepository;
let getProfileServices: UserProfileService;

describe("get profile use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    getProfileServices = new UserProfileService(usersInMemoryRepository);
  });

  it("should be able to login", async () => {
    const createdUser = await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    const user = await getProfileServices.GetProfileUserById({
      id_user: createdUser.id_user,
    });

    expect(user.user_name).toEqual("Jhon Doe");
  });

  it("should not be able to login with wrong id", async () => {
    const createdUser = await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      getProfileServices.GetProfileUserById({
        id_user: "non-exists-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
