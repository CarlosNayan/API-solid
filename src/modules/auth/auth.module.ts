import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { AuthPrismaRepository } from "./repository/auth-repository";
import { AuthRefreshService } from "./services/auth-refresh.service";
import { AuthUserService } from "./services/auth-user.service";

@Module({
	imports: [PassportModule],
	controllers: [AuthController],
	providers: [
		AuthUserService,
		AuthRefreshService,
		LocalStrategy,
		JwtStrategy,
		JwtService,
		{
			provide: "IAuthRepository",
			useClass: AuthPrismaRepository,
		},
	],
})
export class AuthModule {}
