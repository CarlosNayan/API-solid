import { z } from "zod";

export const historyCheckinsVerifyBody = z.object({
	page: z.coerce.number().min(1).default(1),
});

export type CheckinHistoryBody = z.infer<typeof historyCheckinsVerifyBody>;
