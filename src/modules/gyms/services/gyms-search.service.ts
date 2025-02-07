import { gym } from "@prisma/client";
import { IGymsRepository } from "../repository/IGymRepository";
import { ISearchGymRequest } from "../schemas/gyms-search.schema";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GymsSearchService {
	constructor(
		@Inject("IGymsRepository")
		private GymsRepository: IGymsRepository
	) {}

	async Execute({ query, page }: ISearchGymRequest): Promise<gym[]> {
		const gymsFound = this.GymsRepository.SearchGym(query, page ?? 1);

		return gymsFound;
	}
}
