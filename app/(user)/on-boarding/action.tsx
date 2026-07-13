"use server";

import { requireUser } from "@/lib/supabase/data-access";
import { createClient } from "@/lib/supabase/server";

interface SaveOnboardingInput {
	name: string;
	avatarUrl: string;
	genres: number[];
}

export async function saveOnboardingProfile({ name, avatarUrl, genres }: SaveOnboardingInput) {
	const supabase = await createClient();

	const user = await requireUser();

	if (!user) {
		return { error: "Not authenticated" };
	}
	const genresPreferences = genres.map((id) => {
		return {
			user_id: user.id,
			genre_id: id,
		};
	});
	const { error } = await supabase
		.from("profiles")
		.upsert(
			{
				display_name: name,
				avatar_url: avatarUrl,
				user_id: user.id,
				onboarding_completed: true,
			},
			{ onConflict: "user_id" },
		)
		.select();
	if (!error) {
		const { error } = await supabase
			.from("user_genre_preferences")
			.upsert(genresPreferences, { onConflict: "user_id, genre_id" });
		if (error) {
			return { error: `User Genres: ${error.message}` };
		}
	}
	if (error) {
		return { error: `User Profile: ${error.message}` };
	}

	return { error: null };
}
