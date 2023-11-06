import { Prisma } from "@prisma/client";
import { ICheckInsRepository } from "../checkinsRepository";
import { prisma } from "../../lib/prisma";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export class prismaCheckinsRepository implements ICheckInsRepository {
  async CreateCheckin(data: Prisma.checkinsUncheckedCreateInput) {
    const checkin = await prisma.checkins.create({
      data,
    });

    return checkin;
  }

  async FindCheckinByIdOnDate(id_user: string, created_at: Date) {
    const startOfday = dayjs(created_at).startOf("date").utcOffset(-3).format();

    const endOfday = dayjs(created_at).endOf("date").utcOffset(-3).format();

    const checkin = await prisma.checkins.findFirst({
      where: {
        id_user,
        created_at: {
          gte: startOfday,
          lte: endOfday,
        },
      },
    });

    return checkin;
  }

  async FindCheckinById(id_checkin: string) {
    const checkin = await prisma.checkins.findUnique({
      where: {
        id_checkin,
      },
    });

    return checkin;
  }

  async UpdateCheckin(data: {
    id_checkin: string;
    created_at: Date;
    validated_at: Date | null;
    id_user: string;
    id_gym: string;
  }) {
    const updatedCheckin = prisma.checkins.update({
      where: {
        id_checkin: data.id_checkin,
      },
      data,
    });

    return updatedCheckin;
  }

  async CountByUserId(id_user: string) {
    const countCheckins = await prisma.checkins.count({
      where: {
        id_user,
      },
    });

    return countCheckins;
  }

  async ListAllCheckinsHistoryOfUser(id_user: string, page: number) {
    const checkins = await prisma.checkins.findMany({
      where: {
        id_user,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkins;
  }
}
