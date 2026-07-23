"use server";
import z from "zod";
import {
	searchTitleForm,
	searchTitleResult,
	searchTitleSchema,
} from "./validation/search-title.schema";
import { createClient } from "@/lib/supabase/server";

export async function searchTitle(input: searchTitleForm): Promise<searchTitleResult> {
	const result = searchTitleSchema.safeParse(input);
	if (!result.success) {
		const { fieldErrors } = z.flattenError(result.error);
		return {
			success: false,
			fieldErrors,
		} satisfies searchTitleResult;
	}

	return { success: true };
}
