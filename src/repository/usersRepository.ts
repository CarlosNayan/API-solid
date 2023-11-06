import { Prisma, users } from "@prisma/client";
import { prisma } from "../lib/prisma";

export interface IUsersRepository {
  CreateUser(data: Prisma.usersCreateInput): Promise<users>;
  UserEmailVerify(email: string): Promise<users | null>;
  getProfileById(id_user: string): Promise<users | null>;
}