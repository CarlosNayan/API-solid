import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/IGymRepository";
import { IGymsNearbyRequest } from "../schemas/gyms-nearby.schema";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GymsNearbyService {
	constructor(
		@Inject("IGymsRepository")
		private GymsRepository: IGymsRepository
	) {}

	async Execute({
		user_latitude,
		user_longitude,
	}: IGymsNearbyRequest): Promise<gym[]> {
		const gymsFound = this.GymsRepository.SearchGymsNearby(
			user_latitude,
			user_longitude
		);

		return gymsFound;
	}
}
