import {
	Controller,
	Get,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { validateCheckinVerifyBody } from "./schemas/checkins-validate.schema";
import { CheckinCreateService } from "./services/checkin-create.service";
import { CheckinUserValidateService } from "./services/checkin-user-validate.service";
import { createCheckinVerifyBody } from "./schemas/checkins-create.schema";
import { CheckinCountHistoryService } from "./services/checkin-count-history.service";
import { CheckinListHistoryService } from "./services/checkin-list-history.service";
import { historyCheckinsVerifyBody } from "./schemas/checkins-history.schema";

@Controller()
export class CheckinsController {
	constructor(
		private readonly checkinUserValidateService: CheckinUserValidateService,
		private readonly checkinCreateService: CheckinCreateService,
		private readonly checkinsCountService: CheckinCountHistoryService,
		private readonly checkinListHistoryService: CheckinListHistoryService
	) {}

	@Get("/checkins/history")
	@UseGuards(JwtAuthGuard)
	async history(@Req() req) {
		const { page } = historyCheckinsVerifyBody.parse(req.query);

		return await this.checkinListHistoryService.Execute(req.user.sub, { page });
	}

	@Get("/checkins/metrics")
	@UseGuards(JwtAuthGuard)
	async metrics(@Req() req, @Res() res) {
		const result = await this.checkinsCountService.Execute(req.user.sub);

		return res.status(200).send(result);
	}

	@Post("/checkins/create")
	@UseGuards(JwtAuthGuard)
	async create(@Req() req) {
		const { id_gym, user_latitude, user_longitude } =
			createCheckinVerifyBody.parse(req.body);

		await this.checkinCreateService.Execute(req.user.sub, {
			id_gym,
			user_latitude,
			user_longitude,
		});

		return;
	}

	@Patch("/checkins/:id_checkin/validate")
	@UseGuards(JwtAuthGuard)
	async validate(@Req() req, @Res() res) {
		const { id_checkin } = validateCheckinVerifyBody.parse(req.params);

		const result = await this.checkinUserValidateService.Execute(id_checkin);

		return res.status(200).send(result);
	}
}
