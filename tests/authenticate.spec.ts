import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../src/errors/usersErrors";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { UserAuthenticateService } from "../src/services/userAuthenticateService";

let usersInMemoryRepository: InMemoryUserRepository;
let authServices: UserAuthenticateService;

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    authServices = new UserAuthenticateService(usersInMemoryRepository);
  });

  it("should be able to login", async () => {
    await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    const user = await authServices.AuthenticateUser({
      email: "email@email.com",
      password: "123456",
    });

    expect(user.id_user).toEqual(expect.any(String));
  });

  it("should not be able to login with wrong password", async () => {
    await usersInMemoryRepository.CreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      authServices.AuthenticateUser({
        email: "email@email.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to login with wrong email", async () => {
    await expect(() =>
      authServices.AuthenticateUser({
        email: "email@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
