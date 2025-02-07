import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./config/lib/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GymsModule } from "./modules/gyms/gyms.module";
import { UsersModule } from "./modules/users/users.module";
import { CheckinsModule } from "./modules/checkins/checkins.module";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GymsModule,
		CheckinsModule,
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
	],
})
export class AppModule {}
