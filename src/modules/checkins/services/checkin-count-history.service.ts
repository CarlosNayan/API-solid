import { Inject, Injectable } from "@nestjs/common";
import { ICheckInsRepository } from "../repository/ICheckinsRepository";

@Injectable()
export class CheckinCountHistoryService {
	constructor(
		@Inject("ICheckInsRepository")
		private checkInsRepository: ICheckInsRepository
	) {}

	async Execute(id_user: string): Promise<number> {
		const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

		return checkinsMetric;
	}
}
