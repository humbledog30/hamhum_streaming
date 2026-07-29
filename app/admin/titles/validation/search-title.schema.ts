import { z } from "zod";

export const searchTitleSchema = z.object({
	search: z.string().trim().min(2, "Search must be at least 2 characters long"),
});

export type searchTitleForm = z.infer<typeof searchTitleSchema>;

export type searchTitleResult =
	| { success: true }
	| {
			success: false;
			fieldErrors?: Partial<Record<keyof searchTitleForm, string[]>>;
	  };
