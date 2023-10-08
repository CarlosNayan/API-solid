import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../src/services/authenticateUserService";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../src/errors/usersErrors";

let usersInMemoryRepositort: InMemoryUserRepository
let authServices: AuthenticateUseCase

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersInMemoryRepositort = new InMemoryUserRepository();
    authServices = new AuthenticateUseCase(usersInMemoryRepositort);
  });

  it("should be able to login", async () => {
    await usersInMemoryRepositort.CreateUser({
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
    await usersInMemoryRepositort.CreateUser({
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
