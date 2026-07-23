import { apiTmdbClient } from "@/lib/api-client";
import { mapCredits } from "@/lib/hooks/useMovieCredits";
import {
	rollbackMovie,
	saveCredits,
	saveGenres,
	saveMovie,
	savePeople,
} from "@/lib/services/movie.services";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFullMovieDetailsTmdb = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ movieid }: { movieid: number; status: string }) => {
			const response = await apiTmdbClient
				.get(`/movie/${movieid}?append_to_response=credits,release_dates`)
				.then((res) => res.data);

			if (!response) {
				return { status: false, message: "Failed to fetch full movie details!" };
			}

			const supabase = await createClient();

			const movieResult = await saveMovie(supabase, response);
			if (!movieResult.status) return movieResult;

			const { id: movieUuid, wasInserted } = movieResult.data;

			// Rollback helper: only deletes if THIS call created the movie
			const rollbackIfNeeded = async () => {
				if (wasInserted) await rollbackMovie(supabase, movieUuid);
			};

			const genresResult = await saveGenres(supabase, movieUuid, response.genres);
			if (!genresResult.status) {
				await rollbackIfNeeded();
				return genresResult;
			}

			const { people, credits } = mapCredits(response.credits, movieUuid);

			const peopleResult = await savePeople(supabase, people);
			if (!peopleResult.status) {
				await rollbackIfNeeded();
				return peopleResult;
			}

			const creditsResult = await saveCredits(supabase, credits);
			if (!creditsResult.status) {
				await rollbackIfNeeded();
				return creditsResult;
			}

			return { status: true, message: "Title added successfully!" };
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
	});
};
