import { Prisma, checkins } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../prismaRepository/prismaCheckinsRepository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export class InMemoryCheckinsRepository implements ICheckInsRepository {
  public items: checkins[] = [];

  async CreateCheckin(data: Prisma.checkinsUncheckedCreateInput) {
    const checkin = {
      id_checkin: randomUUID(),
      id_user: data.id_user,
      id_gym: data.id_gym,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkin);
    return checkin;
  }

  async CountByUserId(id_user: string) {
    const checkinsHistory = this.items
      .filter((item) => item.id_user === id_user).length

    return checkinsHistory;
  }

  async ListAllCheckinsHistoryOfUser(id_user: string, page: number) {
    const checkinsHistory = this.items
      .filter((item) => item.id_user === id_user)
      .slice((page - 1) * 20, page * 20);
    return checkinsHistory;
  }

  async FindCheckinByIdOnDate(id_user: string, created_at: Date) {
    const checkinInSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
        .startOf("date")
        .utcOffset(-3)
        .format();
      const newCheckinDate = dayjs(created_at)
        .startOf("date")
        .utcOffset(-3)
        .format();

      const isOnSameDate = newCheckinDate === checkInDate;

      return checkIn.id_user === id_user && isOnSameDate;
    });

    if (!checkinInSameDate) {
      return null;
    }

    return checkinInSameDate;
  }
}
