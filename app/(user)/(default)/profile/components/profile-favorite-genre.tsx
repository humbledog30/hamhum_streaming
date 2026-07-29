"use server";

import { appToast } from "@/components/app-toast";
import { createClient } from "@/lib/supabase/server";
import { genresLabel } from "@/lib/utils/format-genre";

const ProfileFavoriteGenre = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("user_genre_preferences").select();
	if (error) {
		appToast.error("Something went wrong!");
	}

	const selectedGenres = data?.map((item) => item?.genre_id) ?? [];
	return (
		<div className="flex flex-wrap gap-3 text-sm mt-4">
			{selectedGenres?.map((id) => {
				const { label } = genresLabel(id);
				return (
					<span
						key={`favorite-genre-${id}`}
						className="border bg-accent/20 p-1 px-4 rounded-2xl"
					>
						{label}
					</span>
				);
			})}
		</div>
	);
};

export default ProfileFavoriteGenre;
