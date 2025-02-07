import { z } from "zod";

export const validateCheckinVerifyBody = z.object({
	id_checkin: z.string().uuid(),
});

export type ValidateCheckinBody = z.infer<typeof validateCheckinVerifyBody>;
