import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../src/errors/usersErrors";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { UserServices } from "../src/services/userServices";

let usersInMemoryRepository: InMemoryUserRepository;
let userServices: UserServices;

describe("Register use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    userServices = new UserServices(usersInMemoryRepository);
  });

  it("should be able to register", async () => {
    const user = await userServices.VerifyAndCreateUser({
      name: "Jhon Doe",
      email: "email@email.com",
      password: "123456",
    });

    expect(user.id_user).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const user = await userServices.VerifyAndCreateUser({
      name: "Jhon Doe",
      email: "email@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "email@email.com";

    await userServices.VerifyAndCreateUser({
      name: "Jhon Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      userServices.VerifyAndCreateUser({
        name: "Jhon Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
