import { Prisma, checkins, users } from "@prisma/client";
import { usersRepository } from "../prismaUsersRepository";
import { checkInsRepository } from "../prismaCheckinsRepository";
import { randomUUID } from "node:crypto";

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
