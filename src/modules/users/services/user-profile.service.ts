import { users } from "@prisma/client";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "src/config/Errors/Errors";
import { IUsersRepository } from "../repository/IUsersRepository";

@Injectable()
export class UserProfileService {
	constructor(
		@Inject("IUsersRepository")
		private readonly UsersRepository: IUsersRepository
	) {}

	async Execute(id_user: string): Promise<users> {
		const userData = await this.UsersRepository.getProfileById(id_user);

		if (!userData) {
			throw new HttpException(ResourceNotFoundError.message, 404);
		}

		return userData;
	}
}
