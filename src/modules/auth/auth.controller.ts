import { Controller, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthRefreshService } from "./services/auth-refresh.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authRefreshService: AuthRefreshService) {}

	@UseGuards(AuthGuard("local"))
	@Post()
	async authUser(@Req() req, @Res() res) {
		return res.status(201).send({
			access_token: req.user.access_token,
			refresh_token: req.user.refresh_token,
		});
	}

	@Patch("refresh")
	async refresh(@Req() req, @Res() res) {
		const { access_token, refresh_token } =
			await this.authRefreshService.Execute(req);

		return res.status(200).send({ access_token, refresh_token });
	}
}
