import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "src/config/Errors/Errors";
import { JWTUserPayload } from "src/config/Interfaces/IJWTUserPayload";
import { IAuthRepository } from "../repository/IAuthRepository";

@Injectable()
export class AuthUserService {
	constructor(
		@Inject("IAuthRepository")
		private readonly AuthRepository: IAuthRepository,
		private readonly jwtService: JwtService
	) {}

	async Execute(
		email: string,
		password: string
	): Promise<{
		access_token: string;
		refresh_token: string;
	}> {
		const user = await this.AuthRepository.FindUserByEmail(email);

		if (!user) throw new UnauthorizedException(InvalidCredentialsError.message);

		const doesPasswordMatches = await compare(password, user.password_hash);

		if (!doesPasswordMatches)
			throw new UnauthorizedException(InvalidCredentialsError.message);

		const payload: JWTUserPayload = {
			sub: user.id_user,
			role: user.role,
		};

		return {
			access_token: this.jwtService.sign(payload, {
				secret: `${process.env.JWT_SECRET}`,
				expiresIn: "15m",
			}),
			refresh_token: this.jwtService.sign(payload, {
				secret: `${process.env.JWT_SECRET}`,
				expiresIn: "2d",
			}),
		};
	}
}
