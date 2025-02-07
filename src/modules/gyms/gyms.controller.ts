/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GymsRegisterService } from "./services/gyms-register.service";
import { GymsNearbyService } from "./services/gyms-nearbys.service";
import { GymsSearchService } from "./services/gyms-search.service";
import { nearbyGymVerifyBody } from "./schemas/gyms-nearby.schema";
import { searchGymVerifyBody } from "./schemas/gyms-search.schema";
import { registerGymVerifyBody } from "./schemas/gyms-create.schema";

@Controller()
export class GymsController {
	constructor(
		private readonly gymsRegisterService: GymsRegisterService,
		private readonly gymsNearbyService: GymsNearbyService,
		private readonly gymsSearchService: GymsSearchService
	) {}

	@Get("/gyms/search")
	@UseGuards(JwtAuthGuard)
	async search(@Req() req) {
		const { query, page } = searchGymVerifyBody.parse(req.query);

		return await this.gymsSearchService.Execute({ query, page });
	}

	@Get("/gyms/nearby")
	@UseGuards(JwtAuthGuard)
	async nearby(@Req() req) {
		const { user_latitude, user_longitude } = nearbyGymVerifyBody.parse(
			req.query
		);

		return await this.gymsNearbyService.Execute({
			user_latitude,
			user_longitude,
		});
	}

	@Post("/gyms/create")
	@UseGuards(JwtAuthGuard)
	async create(@Req() req) {
		const { gym_name, description, phone, latitude, longitude } =
			registerGymVerifyBody.parse(req.body);

		await this.gymsRegisterService.Execute({
			gym_name,
			description,
			phone,
			latitude,
			longitude,
		});

		return { message: "Gym created successfully" };
	}
}
