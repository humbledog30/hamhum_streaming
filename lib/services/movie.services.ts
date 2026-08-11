import {
	tmdbMovieResponseSchema,
	tmdbToMovieInsert,
} from "@/app/admin/titles/validation/add-title.schema";
import { MovieDetailsWithAppend, MovieRelated } from "@/types/movie";
import type { SupabaseClient } from "@supabase/supabase-js";
import { CreditRow } from "@/types/cast";
import { PersonRow } from "../utils/format-movie-data";
import { ParamValue } from "next/dist/server/request/params";

type Result<T> = { status: true; data: T } | { status: false; message: string };

const ok = <T>(data: T): Result<T> => ({ status: true, data });
const fail = (message: string): Result<never> => ({ status: false, message });

const getUsCertification = (response: MovieDetailsWithAppend) => {
	const originated = response?.origin_country[0].toUpperCase() ?? "US";
	const usRelease = response.release_dates.results.find(
		(item: CountryReleaseDates) => item.iso_3166_1 === originated,
	);
	return usRelease?.release_dates.findLast((release: ReleaseDate) => release.certification !== "")
		?.certification;
};

const findExistingMovieId = async (supabase: SupabaseClient, tmdbMovieId: number) => {
	const { data } = await supabase
		.from("movies")
		.select("id")
		.eq("tmdb_id", tmdbMovieId)
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

/** Get Upcoming Releases Movie */
export const getUpcomingReleases = async (supabase: SupabaseClient) => {
	const today = new Date();
	const startDate = today.toISOString().split("T");

	const endOfYear = new Date(today.getFullYear(), 11, 31);
	const endDate = endOfYear.toISOString().split("T")[0];

	const { data, error } = await supabase
		.from("movies")
		.select(
			`
      *,
      genres:movie_genres(genre:genres(id, tmdb_genre_name))
    `,
		)
		.gte("release_date", startDate)
		.lte("release_date", endDate)
		.eq("tmdb_status", "Post Production")
		.order("release_date", { ascending: true });

	if (error) {
		throw error;
	}

	return data;
};

/** Get Popular Movies */
export const getPopularMovies = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase
		.from("movies")
		.select(
			`
					*,
					genres:movie_genres(genre:genres(id, tmdb_genre_name))
				`,
		)
		.order("popularity", { ascending: false })
		.order("vote_count", { ascending: false })
		.order("vote_average", { ascending: false })
		.limit(15);
	if (error) {
		throw error;
	}
	return data;
};

export const getMovieDetails = async (supabase: SupabaseClient, id: ParamValue) => {
	const { data, error } = await supabase
		.from("movies")
		.select(
			`
			*,
			genres:movie_genres(genre:genres(id, tmdb_genre_name)),
			movie_credits(
				role,
				job,
				person:people(tmdb_person_id, name, profile_path)
			)
		`,
		)
		.eq("id", id)
		.single();
	return data;
};

export const getRelatedMovies = async (supabase: SupabaseClient, id: ParamValue) => {
	const { data, error } = await supabase.rpc("get_related_movies", {
		p_movie_id: id,
		p_limit: 6,
	});

	if (error) throw error;
	return data as MovieRelated[];
};

export const getAllTimeGreatMovie = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.rpc("get_top_movies", {
		min_votes: 5000,
		result_limit: 15,
	});

	if (error) throw error;

	return data;
};

export const getBookMark = async (supabase: SupabaseClient, movieId: number | string) => {
	const { data, error } = await supabase
		.from("bookmarks")
		.select()
		.eq("movie_id", movieId)
		.maybeSingle();
	if (error) {
		console.log(error);
		throw error;
	}
	return data;
};

export const setBookMark = async (
	supabase: SupabaseClient,
	movieId: number | string,
	userId: string | null,
) => {
	const { data, error } = await supabase
		.from("bookmarks")
		.insert({ movie_id: movieId, user_id: userId });
	if (error) {
		console.log(error);
		throw error;
	}
	return data;
};

export const deleteBookMark = async (
	supabase: SupabaseClient,
	movieId: number | string,
	userId: string | null,
) => {
	const { data, error } = await supabase
		.from("bookmarks")
		.delete()
		.match({ movie_id: movieId, user_id: userId });
	if (error) {
		console.log(error);
		throw error;
	}
	return data;
};

export const getBookMarkList = async (supabase: SupabaseClient, userId: string | null) => {
	const { data, error } = await supabase
		.from("bookmarks")
		.select(
			`
			*,
			movies!inner(
				*,
				movie_genres!inner(
					genres(id, tmdb_genre_name)
				)
			)
			`,
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data;
};
