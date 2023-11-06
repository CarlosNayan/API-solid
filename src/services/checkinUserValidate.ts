import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";
import { LateCheckinValidationError, ResourceNotFoundError } from "../errors/Errors";
import dayjs from "dayjs";

export class CheckinUserValidateService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CreateCheckinUserValidate(id_checkin: string): Promise<checkins> {
    const checkinById = await this.checkInsRepository.FindCheckinById(
      id_checkin
    );

    if (!checkinById) {
      throw new ResourceNotFoundError();
    }

    const diferenceInMinutesFromCreationOfCheckin = dayjs(new Date()).diff(
      checkinById.created_at,
      "minute"
    )

    if(diferenceInMinutesFromCreationOfCheckin > 20){
      throw new LateCheckinValidationError()
    }

    checkinById.validated_at = new Date();

    return await this.checkInsRepository.UpdateCheckin(checkinById);
  }
}
