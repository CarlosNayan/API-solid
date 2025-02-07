import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { IUsersRepository } from "./IUsersRepository";

@Injectable()
export class UsersPrismaRepository implements IUsersRepository {
	constructor(private prisma: PrismaService) {}

	async CreateUser(data: Prisma.usersCreateInput) {
		const user = await this.prisma.users.create({
			data,
		});

		return user;
	}

	async UserEmailVerify(email: string) {
		const UserWithSameEmail = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});
		return UserWithSameEmail;
	}

	async getProfileById(id_user: string) {
		const userData = await this.prisma.users.findUnique({
			where: {
				id_user,
			},
		});

		return userData;
	}
}
