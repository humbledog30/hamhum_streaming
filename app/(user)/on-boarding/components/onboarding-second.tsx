"use client";
import { genreIcons, genreList } from "@/lib/utils/format-genre";
import { SlashIcon } from "lucide-react";

interface OnboardingSecondProps {
	isActive: boolean;
	selectedGenres: number[];
	setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
}
const OnboardingSecond = ({
	isActive,
	selectedGenres,
	setSelectedGenres,
}: OnboardingSecondProps) => {
	const toggleGenre = (genreId: number) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId) ? prev.filter((item) => item !== genreId) : [...prev, genreId],
		);
	};

	return (
		<div
			data-step={isActive ? "active" : "inactive"}
			className="profile-step-2 hidden data-[step=active]:flex flex-col items-center gap-4 py-6"
		>
			<div className=" flex gap-3 uppercase items-center text-xs mb-2 text-primary/80 tracking-widest">
				<SlashIcon size={14} className="rotate-45" />
				<span>Step 2 of 3</span>
				<SlashIcon size={14} className="rotate-45" />
			</div>
			<h3 className="text-5xl font-fraunces font-semibold">
				What do you love{" "}
				<span className="italic font-normal text-muted-foreground">watching?</span>
			</h3>
			<p className="text-muted-foreground max-w-90 text-sm">
				Pick at least three — we'll shape your home rows around your taste.
			</p>
			<div className="mt-5 text-muted-foreground/90  flex items-center justify-center flex-wrap gap-3 max-w-200">
				{genreList.map((genre) => {
					const Icon = genreIcons[genre.id];
					return (
						<button
							onClick={() => toggleGenre(genre.id)}
							data-genre={selectedGenres.includes(genre.id) ? "active" : "inactive"}
							className="cursor-pointer data-[genre=active]:from-background/80 rounded-md data-[genre=active]:to-primary bg-linear-to-br data-[genre=active]:text-foreground flex gap-2 bg-muted-foreground/15 border-muted-foreground/90 border p-2 px-5 text-sm items-center transition-all duration-150"
							key={`genre-badge-${genre.id}`}
						>
							<Icon size={14} />
							{genre.name}
						</button>
					);
				})}
			</div>
			<p className="uppercase text-xs flex items-center gap-1 mt-3 tracking-wider text-foreground/40">
				<span className="text-primary font-bold text-sm">{selectedGenres.length}</span>{" "}
				selected · at least 3 to continue
			</p>
		</div>
	);
};

export default OnboardingSecond;
