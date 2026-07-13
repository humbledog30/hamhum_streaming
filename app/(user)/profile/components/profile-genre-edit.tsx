import { createClient } from "@/lib/supabase/server";
import ProfileGenreForm from "./profile-genre-form";
import { appToast } from "@/components/app-toast";

const ProfileGenreEdit = async () => {
	const supabase = await createClient();
	const { data: genrePreferences, error } = await supabase
		.from("user_genre_preferences")
		.select();

	if (error) {
		appToast.error("Something went wrong!");
	}

	const profileGenres = genrePreferences?.map((item) => item.genre_id) ?? [];

	return <ProfileGenreForm profileGenres={profileGenres} />;
};

export default ProfileGenreEdit;
