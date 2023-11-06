import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../src/errors/Errors";
import { InMemoryUserRepository } from "../src/repository/inMemoryRepository/inMemoryUserRepository";
import { UserRegisterService } from "../src/services/userRegisterService";

let usersInMemoryRepository: InMemoryUserRepository;
let userService: UserRegisterService;

describe("user register use case", () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUserRepository();
    userService = new UserRegisterService(usersInMemoryRepository);
  });

  it("should be able to register", async () => {
    const user = await userService.VerifyAndCreateUser({
      user_name: "Jhon Doe",
      email: "email@email.com",
      password: "123456",
    });

    expect(user.id_user).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const user = await userService.VerifyAndCreateUser({
      user_name: "Jhon Doe",
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

    await userService.VerifyAndCreateUser({
      user_name: "Jhon Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      userService.VerifyAndCreateUser({
        user_name: "Jhon Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
