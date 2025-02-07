import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ICheckInsRepository } from "../repository/ICheckinsRepository";
import { IGymsRepository } from "src/modules/gyms/repository/IGymRepository";
import { checkins } from "@prisma/client";
import {
	MaxDistanceError,
	MaxNumberOfCheckInsError,
	ResourceNotFoundError,
} from "src/config/Errors/Errors";
import { getDistanceBetweenCoordinates } from "src/config/utils/getDistanceBetweenCoordinates";
import { CreateCheckinBody } from "../schemas/checkins-create.schema";

@Injectable()
export class CheckinCreateService {
	constructor(
		@Inject("ICheckInsRepository")
		private checkInsRepository: ICheckInsRepository,
		@Inject("IGymsRepository")
		private gymRepository: IGymsRepository
	) {}

	async Execute(
		id_user: string,
		{ id_gym, user_latitude, user_longitude }: CreateCheckinBody
	): Promise<checkins> {
		const gym = await this.gymRepository.FindGymById(id_gym);

		if (!gym) {
			throw new HttpException(ResourceNotFoundError.message, 404);
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: user_latitude, longitude: user_longitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		);

		// distance in KM metric
		if (distance > 0.1) {
			throw new HttpException(MaxDistanceError.message, 400);
		}

		const checkInOnSameDay =
			await this.checkInsRepository.FindCheckinByIdOnDate(id_user, new Date());

		if (checkInOnSameDay) {
			throw new HttpException(MaxNumberOfCheckInsError.message, 400);
		}

		const createCheckin = await this.checkInsRepository.CreateCheckin({
			id_user,
			id_gym,
		});

		return createCheckin;
	}
}
