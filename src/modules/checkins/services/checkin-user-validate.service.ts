import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../repository/ICheckinsRepository";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import {
	LateCheckinValidationError,
	ResourceNotFoundError,
} from "src/config/Errors/Errors";
import moment from "src/config/utils/moment";

@Injectable()
export class CheckinUserValidateService {
	constructor(
		@Inject("ICheckInsRepository")
		private checkInsRepository: ICheckInsRepository
	) {}

	async Execute(id_checkin: string): Promise<checkins> {
		const checkinById =
			await this.checkInsRepository.FindCheckinById(id_checkin);

		if (!checkinById) {
			throw new HttpException(ResourceNotFoundError.message, 404);
		}

		const createdTime = new moment(checkinById.created_at);

		const diferenceInMinutesFromCreationOfCheckin = new moment(new Date()).diff(
			createdTime,
			"minutes"
		);

		if (diferenceInMinutesFromCreationOfCheckin > 20) {
			throw new HttpException(LateCheckinValidationError.message, 400);
		}

		checkinById.validated_at = new Date();

		return await this.checkInsRepository.UpdateCheckin(checkinById);
	}
}
