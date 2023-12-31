import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { IUsersRepository } from "../../types/RepositoryInterfaces/IUsersRepository";

export class prismaUsersRepository implements IUsersRepository {
  async CreateUser(data: Prisma.usersCreateInput) {
    const user = await prisma.users.create({
      data,
    });

    return user;
  }

  async UserEmailVerify(email: string) {
    const UserWithSameEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return UserWithSameEmail;
  }

  async getProfileById(id_user: string) {
    const userData = await prisma.users.findUnique({
      where: {
        id_user,
      },
    });

    return userData;
  }
}
