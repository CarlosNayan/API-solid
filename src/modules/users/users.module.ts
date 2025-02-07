import { Module } from "@nestjs/common";
import { UsersPrismaRepository } from "./repository/users-prisma-repository";
import { UserProfileService } from "./services/user-profile.service";
import { UserRegisterService } from "./services/user-register.service";
import { UsersController } from "./users.controller";

@Module({
	controllers: [UsersController],
	providers: [
		UserProfileService,
		UserRegisterService,
		{
			provide: "IUsersRepository",
			useClass: UsersPrismaRepository,
		},
	],
})
export class UsersModule {}
