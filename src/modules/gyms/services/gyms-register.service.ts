import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/IGymRepository";
import { IRegisterGymRequest } from "../schemas/gyms-create.schema";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GymsRegisterService {
	constructor(
		@Inject("IGymsRepository")
		private GymsRepository: IGymsRepository
	) {}

	async Execute({
		gym_name,
		description,
		phone,
		latitude,
		longitude,
	}: IRegisterGymRequest): Promise<gym> {
		const registerGym = this.GymsRepository.CreateGym({
			gym_name,
			description,
			phone,
			latitude,
			longitude,
		});

		return registerGym;
	}
}
