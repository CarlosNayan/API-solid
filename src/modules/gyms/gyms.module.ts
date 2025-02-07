import { Module } from "@nestjs/common";
import { GymsController } from "./gyms.controller";
import { GymsPrismaRepository } from "./repository/gyms-prisma-repository";
import { GymsNearbyService } from "./services/gyms-nearbys.service";
import { GymsRegisterService } from "./services/gyms-register.service";
import { GymsSearchService } from "./services/gyms-search.service";

@Module({
	controllers: [GymsController],
	providers: [
		GymsNearbyService,
		GymsSearchService,
		GymsRegisterService,
		{
			provide: "IGymsRepository",
			useClass: GymsPrismaRepository,
		},
	],
})
export class GymsModule {}
