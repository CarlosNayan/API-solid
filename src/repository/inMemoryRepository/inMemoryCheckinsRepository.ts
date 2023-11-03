import { Prisma, checkins } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { checkInsRepository } from "../prismaRepository/prismaCheckinsRepository";

export class InMemoryCheckinsRepository implements checkInsRepository {
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
}
