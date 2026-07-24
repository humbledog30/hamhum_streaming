import {
	tmdbMovieResponseSchema,
	tmdbToMovieInsert,
} from "@/app/admin/titles/validation/add-title.schema";
import { MovieDetailsWithAppend } from "@/types/movie";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PersonRow } from "../hooks/useMovieCredits";
import { CreditRow } from "@/types/cast";

type Result<T> = { status: true; data: T } | { status: false; message: string };

const ok = <T>(data: T): Result<T> => ({ status: true, data });
const fail = (message: string): Result<never> => ({ status: false, message });

const getUsCertification = (response: MovieDetailsWithAppend) => {
	const usRelease = response.release_dates.results.find(
		(item: CountryReleaseDates) => item.iso_3166_1 === "US",
	);
	return usRelease?.release_dates.findLast((release: ReleaseDate) => release.certification !== "")
		?.certification;
};

const findExistingMovieId = async (supabase: SupabaseClient, tmdbMovieId: number) => {
	const { data } = await supabase
		.from("movies")
		.select("id")
		.eq("tmdb_movie_id", tmdbMovieId)
		.maybeSingle();
	return data?.id ?? null;
};

export const saveMovie = async (
	supabase: SupabaseClient,
	response: MovieDetailsWithAppend,
	publishStatus: string,
): Promise<Result<{ id: string; wasInserted: boolean }>> => {
	const certification = getUsCertification(response);
	const movieRow = tmdbToMovieInsert(response, certification, publishStatus);
	if (!movieRow.success) return fail("Movie row is invalid!");

	const existingId = await findExistingMovieId(supabase, response.id);

	const { data, error } = await supabase.from("movies").upsert(movieRow.data).select().single();

	if (error) return fail(error.message);

	return ok({ id: data.id, wasInserted: !existingId });
};

export const saveGenres = async (
	supabase: SupabaseClient,
	movieId: string,
	genres: { id: number; name: string }[],
): Promise<Result<null>> => {
	const rows = genres.map((g) => ({ movie_id: movieId, genre_id: g.id }));

	const { error } = await supabase
		.from("movie_genres")
		.upsert(rows, { onConflict: "movie_id,genre_id" });

	if (error) {
		return fail(error.code === "23505" ? "Movie is Duplicate!" : error.message);
	}
	return ok(null);
};

export const savePeople = async (
	supabase: SupabaseClient,
	people: PersonRow[],
): Promise<Result<null>> => {
	const { error } = await supabase
		.from("people")
		.upsert(people, { onConflict: "tmdb_person_id" });

	if (error) return fail(error.message);
	return ok(null);
};

export const saveCredits = async (
	supabase: SupabaseClient,
	credits: CreditRow[],
): Promise<Result<null>> => {
	const { error } = await supabase
		.from("movie_credits")
		.upsert(credits, { onConflict: "movie_id,tmdb_person_id,role" });

	if (error) return fail(error.message);
	return ok(null);
};

/** Deletes the movie row; genres and credits cascade automatically. */
export const rollbackMovie = async (supabase: SupabaseClient, movieId: string) => {
	await supabase.from("movies").delete().eq("id", movieId);
};
