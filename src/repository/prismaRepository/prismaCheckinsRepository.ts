import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class checkInsRepository {
  async CreateCheckin(data: Prisma.checkinsUncheckedCreateInput) {
    const checkin = await prisma.checkins.create({
      data,
    });

    return checkin;
  }
}
