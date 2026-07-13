"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { genreIcons, genreList } from "@/lib/hooks/useGenresLabel";
import { useState } from "react";

interface ProfileGenreFormProps {
	profileGenres: number[];
}

const ProfileGenreForm = ({ profileGenres }: ProfileGenreFormProps) => {
	const [selectedGenres, setSelectedGenres] = useState<number[]>(profileGenres);

	const handleProfileGenre = (e: React.FormEvent) => {
		e.preventDefault();
		appToast.info("Profile Update will available Soon!");
	};
	return (
		<form onSubmit={handleProfileGenre}>
			<div className="flex flex-col gap-5">
				<div className="mt-5 text-muted-foreground/90 flex flex-wrap gap-3 max-w-200">
					{genreList.map((genre, index) => {
						const Icon = genreIcons[genre.id];
						return (
							<button
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
							</button>
						);
					})}
				</div>
				<Button className="cursor-pointer self-start">Save preferences</Button>
			</div>
		</form>
	);
};

export default ProfileGenreForm;
