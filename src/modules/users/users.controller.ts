import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { registerUserVerifyBody } from "./schemas/user-register.schema";
import { UserProfileService } from "./services/user-profile.service";
import { UserRegisterService } from "./services/user-register.service";

@Controller()
export class UsersController {
	constructor(
		private readonly userRegisterService: UserRegisterService,
		private readonly userProfileService: UserProfileService
	) {}

	@Get("/users/me")
	@UseGuards(JwtAuthGuard)
	async profile(@Req() req) {
		const { id_user } = req.user;
		return await this.userProfileService.Execute(id_user);
	}

	@Post("/users/create")
	async create(@Req() req) {
		const { user_name, email, password } = registerUserVerifyBody.parse(
			req.body
		);

		return await this.userRegisterService.Execute({
			user_name,
			email,
			password,
		});
	}
}
