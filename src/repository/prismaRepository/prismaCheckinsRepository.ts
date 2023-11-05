import { Prisma, checkins } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export interface ICheckInsRepository {
  CreateCheckin(data: Prisma.checkinsUncheckedCreateInput): Promise<checkins>
  FindCheckinByIdOnDate(id_user: string, created_at: Date): Promise<checkins | null>
  ListAllCheckinsHistoryOfUser(id_user: string, page: number): Promise<checkins[]>
}