"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { genreIcons, genreList } from "@/lib/hooks/useGenresLabel";
import { useState } from "react";
import savePreferences from "../settings/action";

interface ProfileGenreFormProps {
	profileGenres: number[];
}

const ProfileGenreForm = ({ profileGenres }: ProfileGenreFormProps) => {
	const [selectedGenres, setSelectedGenres] = useState<number[]>(profileGenres);
	const [isSavingPreferences, setIsSavingPreferences] = useState(false);
	const handleProfileGenre = async (e: React.FormEvent) => {
		e.preventDefault();
		// appToast.info("Profile Update will available Soon!");
		setIsSavingPreferences(true);
		const { error } = await savePreferences({ genres: selectedGenres });
		setIsSavingPreferences(false);
		if (error) {
			appToast.error(error);
			return;
		}
		appToast.success("Genre Preferences Updated!");
	};
	return (
		<form onSubmit={handleProfileGenre}>
			<div className="flex flex-col gap-5">
				<div className="mt-5 text-muted-foreground/90 flex flex-wrap gap-3 max-w-200">
					{genreList.map((genre, index) => {
						const Icon = genreIcons[genre.id];
						return (
							<span
								onClick={() => {
									setSelectedGenres((prev) => {
										if (prev.includes(genre.id)) {
											return prev.filter((item) => item !== genre.id);
										}
										return [...prev, genre.id];
									});
								}}
								data-genre={
									selectedGenres.includes(genre.id) ? "active" : "inactive"
								}
								className="cursor-pointer data-[genre=active]:from-background/80 rounded-md data-[genre=active]:to-primary bg-linear-to-br data-[genre=active]:text-foreground flex gap-2 bg-muted-foreground/15 border-muted-foreground/90 border p-2 px-5 text-sm items-center transition-all duration-150"
								key={`genre-badge-${genre.id}`}
							>
								<Icon size={14} />
								{genre.name}
							</span>
						);
					})}
				</div>
				<Button
					disabled={isSavingPreferences}
					className="cursor-pointer self-start primary-btn"
				>
					{isSavingPreferences ? "Saving preferences..." : "Save preferences"}
				</Button>
			</div>
		</form>
	);
};

export default ProfileGenreForm;
