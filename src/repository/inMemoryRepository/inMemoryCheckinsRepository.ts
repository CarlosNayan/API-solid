import { Prisma, checkins } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../checkinsRepository";
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

  async UpdateCheckin(data: checkins) {
    const checkinIndex = this.items.findIndex(
      (item) => item.id_checkin === data.id_checkin
    );

    if (checkinIndex >= 0) {
      this.items[checkinIndex] = data;
    }

    return this.items[checkinIndex];
  }

  async CountByUserId(id_user: string) {
    const checkinsHistory = this.items.filter(
      (item) => item.id_user === id_user
    ).length;

    return checkinsHistory;
  }

  async ListAllCheckinsHistoryOfUser(id_user: string, page: number) {
    const checkinsHistory = this.items
      .filter((item) => item.id_user === id_user)
      .slice((page - 1) * 20, page * 20);
    return checkinsHistory;
  }

  async FindCheckinById(id_checkin: string) {
    const checkinById = this.items.find(
      (item) => item.id_checkin === id_checkin
    );

    if (!checkinById) {
      return null;
    }
    return checkinById;
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
