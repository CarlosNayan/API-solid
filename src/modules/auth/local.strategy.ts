import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { InvalidCredentialsError } from "src/config/Errors/Errors";
import { AuthUserService } from "./services/auth-user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authUserService: AuthUserService) {
		super({ usernameField: "email", passReqToCallback: true });
	}

	async validate(
		req: Request,
		email: string,
		password: string
	): Promise<{ access_token: string; refresh_token: string }> {
		const tokens = await this.authUserService.Execute(email, password);
		if (!tokens) {
			throw new UnauthorizedException(InvalidCredentialsError.message);
		}
		return tokens;
	}
}
