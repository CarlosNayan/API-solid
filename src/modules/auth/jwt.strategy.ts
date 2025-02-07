import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	async validate(payload: any) {
		return { ...payload };
	}
}

/*
Adicionar esta importação em qualquer módulo para validar em todos os endpoints
providers: [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
], */
