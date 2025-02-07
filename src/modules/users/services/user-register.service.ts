import bcryptjs from "bcryptjs";
import { users } from "@prisma/client";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import { IUsersRepository } from "../repository/IUsersRepository";
import { UserAlreadyExistsError } from "src/config/Errors/Errors";
import { IVerifyAndCreateUserRequest } from "../schemas/user-register.schema";

@Injectable()
export class UserRegisterService {
	constructor(
		@Inject("IUsersRepository")
		private readonly UsersRepository: IUsersRepository
	) {}

	async Execute({
		user_name,
		email,
		password,
	}: IVerifyAndCreateUserRequest): Promise<users> {
		const password_hash = await bcryptjs.hash(password, 6);
		const emailAlreadyExists = this.UsersRepository.UserEmailVerify(email);

		if (await emailAlreadyExists) {
			throw new HttpException(UserAlreadyExistsError.message, 409);
		}

		const register = this.UsersRepository.CreateUser({
			user_name,
			email,
			password_hash,
		});

		return register;
	}
}
