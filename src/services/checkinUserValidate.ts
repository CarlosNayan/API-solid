import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";
import { ResourceNotFoundError } from "../errors/Errors";

export class CheckinUserValidateService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CreateCheckinUserValidate(id_checkin: string): Promise<checkins> {
    const checkinById = await this.checkInsRepository.FindCheckinById(
      id_checkin
    );

    if (!checkinById) {
      throw new ResourceNotFoundError();
    }

    checkinById.validated_at = new Date();

    return await this.checkInsRepository.UpdateCheckin(checkinById);
  }
}
