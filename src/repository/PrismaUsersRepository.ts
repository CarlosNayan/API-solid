import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class PrismaUsersRepository {
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
}
