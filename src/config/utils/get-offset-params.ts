import { z } from "zod";

export const gmtHeaderVerifySchema = z.object({
	user_offset: z.coerce.number().optional().default(0),
});

export type GmtType = z.infer<typeof gmtHeaderVerifySchema>;
