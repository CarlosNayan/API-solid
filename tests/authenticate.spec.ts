import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../src/errors/usersErrors";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { AuthenticateUserService } from "../src/services/authenticateUserService";

let usersInMemoryRepository: InMemoryUserRepository;
let authServices: AuthenticateUserService;

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    authServices = new AuthenticateUserService(usersInMemoryRepository);
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

    expect(() =>
      authServices.AuthenticateUser({
        email: "email@email.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to login with wrong email", async () => {
    expect(() =>
      authServices.AuthenticateUser({
        email: "email@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
