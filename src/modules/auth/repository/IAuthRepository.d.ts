import { users } from "@prisma/client";

export interface IAuthRepository {
	FindUserByEmail(email: string): Promise<users | null>;
}
