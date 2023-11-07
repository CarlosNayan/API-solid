import { Prisma, users } from "@prisma/client";
import { IUsersRepository } from "../../types/RepositoryInterfaces/IUsersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements IUsersRepository {
  public items: users[] = [];

  async getProfileById(id_user: string) {
    const userData = this.items.find((item) => item.id_user === id_user);

    if (!userData) {
      return null;
    }

    return userData;
  }

  async UserEmailVerify(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async CreateUser(data: Prisma.usersCreateInput) {
    const user = {
      id_user: randomUUID(),
      user_name: data.user_name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);
    return user;
  }
}
