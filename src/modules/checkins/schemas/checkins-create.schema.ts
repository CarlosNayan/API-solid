import { z } from "zod";

export const createCheckinVerifyBody = z.object({
	id_gym: z.coerce.string().uuid(),
	user_latitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 90;
	}),
	user_longitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 180;
	}),
});

export type CreateCheckinBody = z.TypeOf<typeof createCheckinVerifyBody>;
