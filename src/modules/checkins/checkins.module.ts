import { Module } from "@nestjs/common";
import { GymsPrismaRepository } from "../gyms/repository/gyms-prisma-repository";
import { CheckinsController } from "./checkins.controller";
import { CheckinsPrismaRepository } from "./repository/checkins-prisma-repository";
import { CheckinCountHistoryService } from "./services/checkin-count-history.service";
import { CheckinCreateService } from "./services/checkin-create.service";
import { CheckinListHistoryService } from "./services/checkin-list-history.service";
import { CheckinUserValidateService } from "./services/checkin-user-validate.service";

@Module({
	controllers: [CheckinsController],
	providers: [
		CheckinUserValidateService,
		CheckinCreateService,
		CheckinCountHistoryService,
		CheckinListHistoryService,
		{
			provide: "ICheckInsRepository",
			useClass: CheckinsPrismaRepository,
		},
		{
			provide: "IGymsRepository",
			useClass: GymsPrismaRepository,
		},
	],
})
export class CheckinsModule {}
