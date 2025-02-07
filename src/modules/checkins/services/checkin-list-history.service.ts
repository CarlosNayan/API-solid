import { Inject, Injectable } from "@nestjs/common";
import { checkins } from "@prisma/client";
import { ICheckInsRepository } from "../repository/ICheckinsRepository";
import { CheckinHistoryBody } from "../schemas/checkins-history.schema";

@Injectable()
export class CheckinListHistoryService {
	constructor(
		@Inject("ICheckInsRepository")
		private checkInsRepository: ICheckInsRepository
	) {}

	async Execute(
		id_user: string,
		{ page }: CheckinHistoryBody
	): Promise<checkins[]> {
		const checkinsHistory =
			await this.checkInsRepository.ListAllCheckinsHistoryOfUser(
				id_user,
				page ?? 1
			);

		return checkinsHistory;
	}
}
