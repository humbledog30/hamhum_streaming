import {
	Swords,
	Compass,
	Sparkles,
	Laugh,
	Fingerprint,
	Clapperboard,
	Drama,
	Users,
	Wand2,
	Landmark,
	Ghost,
	Music,
	Search,
	Heart,
	Rocket,
	Tv,
	Zap,
	Shield,
	Mountain,
} from "lucide-react";

export const genreList = [
	{ id: 28, name: "Action" },
	{ id: 12, name: "Adventure" },
	{ id: 16, name: "Animation" },
	{ id: 35, name: "Comedy" },
	{ id: 80, name: "Crime" },
	{ id: 99, name: "Documentary" },
	{ id: 18, name: "Drama" },
	{ id: 10751, name: "Family" },
	{ id: 14, name: "Fantasy" },
	{ id: 36, name: "History" },
	{ id: 27, name: "Horror" },
	{ id: 10402, name: "Music" },
	{ id: 9648, name: "Mystery" },
	{ id: 10749, name: "Romance" },
	{ id: 878, name: "Science Fiction" },
	{ id: 10770, name: "TV Movie" },
	{ id: 53, name: "Thriller" },
	{ id: 10752, name: "War" },
	{ id: 37, name: "Western" },
];

export const genreIcons: Record<
	number,
	React.ComponentType<{ className?: string; size?: number }>
> = {
	28: Swords,
	12: Compass,
	16: Sparkles,
	35: Laugh,
	80: Fingerprint,
	99: Clapperboard,
	18: Drama,
	10751: Users,
	14: Wand2,
	36: Landmark,
	27: Ghost,
	10402: Music,
	9648: Search,
	10749: Heart,
	878: Rocket,
	10770: Tv,
	53: Zap,
	10752: Shield,
	37: Mountain,
};

export const useGenresLabel = (id: number) => {
	if (!id) {
		return {
			label: "",
		};
	}

	return {
		label: genreList.find((item) => item.id === id)?.name ?? "",
	};
};
