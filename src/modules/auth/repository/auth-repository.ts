import { users } from "@prisma/client";
import { PrismaService } from "src/config/lib/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { IAuthRepository } from "./IAuthRepository";

@Injectable()
export class AuthPrismaRepository implements IAuthRepository {
	constructor(private prisma: PrismaService) {}

	async FindUserByEmail(email: string): Promise<users | null> {
		const UserWithSameEmail = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});
		return UserWithSameEmail;
	}
}
