import { z } from "zod";

export const searchTitleSchema = z.object({
	search: z.string().trim().min(3, "Search must be at least 3 characters long"),
});

export type searchTitleForm = z.infer<typeof searchTitleSchema>;

export type searchTitleResult =
	| { success: true }
	| {
			success: false;
			fieldErrors?: Partial<Record<keyof searchTitleForm, string[]>>;
	  };
