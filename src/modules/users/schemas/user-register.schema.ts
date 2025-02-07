import { z } from "zod";

export const registerUserVerifyBody = z.object({
	user_name: z.string(),
	email: z.string(),
	password: z.string().min(6),
});

export type IVerifyAndCreateUserRequest = z.infer<
	typeof registerUserVerifyBody
>;
