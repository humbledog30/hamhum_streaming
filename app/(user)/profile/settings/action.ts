"use server";
import { requireUser } from "@/lib/supabase/data-access";
import { createClient } from "@/lib/supabase/server";

interface SavePreferences {
	genres: number[];
}

export default async function savePreferences({ genres }: SavePreferences) {
	const supabase = await createClient();

	const user = await requireUser();
	if (!user) {
		return { error: "Not authenticated" };
	}

	const { error: errorDelete } = await supabase
		.from("user_genre_preferences")
		.delete()
		.eq("user_id", user.id);
	if (errorDelete) {
		return { error: errorDelete.message };
	}
	const genresPreferences = genres.map((id) => {
		return {
			user_id: user.id,
			genre_id: id,
		};
	});

	const { error } = await supabase
		.from("user_genre_preferences")
		.upsert(genresPreferences, { onConflict: "user_id, genre_id" });
	if (error) {
		return { error: error.message };
	}

	return { error: null };
}
