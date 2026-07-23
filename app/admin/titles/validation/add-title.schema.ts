import { z } from "zod";

export const tmdbMovieResponseSchema = z.object({
	id: z.number(),
	title: z.string(),
	original_title: z.string().nullable(),
	overview: z.string().nullable(),
	tagline: z.string().nullable(),
	release_date: z.string().nullable(),
	runtime: z.number().nullable(),
	original_language: z.string().nullable(),
	status: z.string().nullable(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable(),
	vote_average: z.number().nullable(),
	vote_count: z.number().nullable(),
	popularity: z.number().nullable(),
});

export type TmdbMovieResponse = z.infer<typeof tmdbMovieResponseSchema>;

export const tmdbMovieDetailsSchema = z.object({
	tmdb_id: z.number(),
	title: z.string().max(255),
	original_title: z.string().max(255).nullable(),
	overview: z.string().nullable(),
	tagline: z.string().max(255).nullable(),
	release_date: z.string().nullable(),
	certification: z.string().max(10).nullable(),
	runtime: z.number().int().nullable(),
	original_language: z.string().max(10).nullable(),
	status: z.string().max(30).nullable(),
	tmdb_status: z.string().max(30).nullable(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable(),
	vote_average: z.number().min(0).max(99.9).nullable(),
	vote_count: z.number().int().nullable(),
	popularity: z.number().nullable(),
});

export type MovieInsert = z.infer<typeof tmdbMovieDetailsSchema>;

export type MovieInsertResult =
	| { success: true; data: MovieInsert }
	| {
			success: false;
			fieldErrors?: Partial<Record<keyof MovieInsert, string[]>>;
	  };

export function tmdbToMovieInsert(
	tmdb: TmdbMovieResponse,
	certification?: string | null,
	status?: string,
): MovieInsertResult {
	const result = tmdbMovieDetailsSchema.safeParse({
		tmdb_id: tmdb.id,
		title: tmdb.title,
		original_title: tmdb.original_title || null,
		overview: tmdb.overview || null,
		tagline: tmdb.tagline || null,
		release_date: tmdb.release_date || null,
		certification: certification ?? null,
		runtime: tmdb.runtime || null,
		original_language: tmdb.original_language || null,
		tmdb_status: tmdb.status || null,
		poster_path: tmdb.poster_path || null,
		backdrop_path: tmdb.backdrop_path || null,
		vote_average: tmdb.vote_average || null,
		vote_count: tmdb.vote_count || null,
		popularity: tmdb.popularity || null,
		status: status?.toLowerCase() || "draft",
	});

	if (!result.success) {
		const { fieldErrors } = z.flattenError(result.error);
		return { success: false, fieldErrors: fieldErrors };
	}

	return { success: true, data: result.data };
}
