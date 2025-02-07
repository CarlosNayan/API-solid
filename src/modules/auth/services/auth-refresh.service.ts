import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWTUserPayload } from "src/config/Interfaces/IJWTUserPayload";

@Injectable()
export class AuthRefreshService {
	constructor(private readonly jwtService: JwtService) {}

	async Execute(req: Request) {
		try {
			const tokenString = req.body.refresh_token;

			const { sub, role } = await this.jwtService.verify(tokenString, {
				secret: `${process.env.JWT_SECRET}`,
			});

			const payload: JWTUserPayload = {
				sub: sub,
				role: role,
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			throw new UnauthorizedException();
		}
	}
}
