import { z } from "zod";

export const nearbyGymVerifyBody = z.object({
	user_latitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 90;
	}),
	user_longitude: z.coerce.number().refine((value) => {
		return Math.abs(value) <= 180;
	}),
});

export type IGymsNearbyRequest = z.infer<typeof nearbyGymVerifyBody>;
