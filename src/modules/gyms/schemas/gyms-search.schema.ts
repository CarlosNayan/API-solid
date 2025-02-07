import { z } from "zod";

export const searchGymVerifyBody = z.object({
	query: z.string(),
	page: z.coerce.number().min(1).default(1),
});

export type ISearchGymRequest = z.infer<typeof searchGymVerifyBody>;
