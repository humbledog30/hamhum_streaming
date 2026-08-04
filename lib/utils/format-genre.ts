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
	{
		id: 28,
		name: "Action",
		description:
			"High-stakes battles, explosive set pieces, daring heroes, and adrenaline-fueled adventures where every second could mean the difference between victory and defeat.",
	},
	{
		id: 12,
		name: "Adventure",
		description:
			"Embark on unforgettable journeys through uncharted lands, ancient mysteries, and breathtaking worlds where courage and curiosity lead the way.",
	},
	{
		id: 16,
		name: "Animation",
		description:
			"Experience beautifully crafted stories brought to life through stunning animation, unforgettable characters, and boundless imagination for audiences of every age.",
	},
	{
		id: 35,
		name: "Comedy",
		description:
			"Escape into a world of clever humor, hilarious mishaps, and heartwarming moments guaranteed to leave you smiling long after the credits roll.",
	},
	{
		id: 80,
		name: "Crime",
		description:
			"Dive into the dangerous underworld of organized crime, brilliant detectives, impossible heists, and moral choices where justice is never black and white.",
	},
	{
		id: 99,
		name: "Documentary",
		description:
			"Discover extraordinary true stories, remarkable people, and eye-opening events that reveal the fascinating realities of our world and beyond.",
	},
	{
		id: 18,
		name: "Drama",
		description:
			"Immerse yourself in emotionally powerful stories filled with unforgettable performances, personal struggles, and life-changing moments that leave a lasting impact.",
	},
	{
		id: 10751,
		name: "Family",
		description:
			"Heartwarming adventures filled with laughter, friendship, and timeless lessons, perfect for creating unforgettable memories with loved ones of all ages.",
	},
	{
		id: 14,
		name: "Fantasy",
		description:
			"Step into enchanted realms where magic is real, legendary creatures roam, and epic destinies unfold beyond the limits of imagination.",
	},
	{
		id: 36,
		name: "History",
		description:
			"Witness defining moments from the past through compelling stories inspired by legendary figures, world-changing events, and remarkable historical achievements.",
	},
	{
		id: 27,
		name: "Horror",
		description:
			"Enter a world of terrifying nightmares, supernatural horrors, and relentless suspense where fear lurks around every corner and nothing feels safe.",
	},
	{
		id: 10402,
		name: "Music",
		description:
			"Celebrate the power of music through inspiring performances, unforgettable melodies, and the extraordinary lives of artists who shaped generations.",
	},
	{
		id: 9648,
		name: "Mystery",
		description:
			"Follow cryptic clues, hidden secrets, and unexpected twists as every revelation brings you closer to uncovering the truth behind the unknown.",
	},
	{
		id: 10749,
		name: "Romance",
		description:
			"Experience unforgettable love stories filled with passion, longing, heartbreak, and the emotional connections that define the human experience.",
	},
	{
		id: 878,
		name: "Science Fiction",
		description:
			"Journey beyond reality into futuristic civilizations, distant galaxies, groundbreaking technology, and extraordinary possibilities that challenge the limits of imagination.",
	},
	{
		id: 10770,
		name: "TV Movie",
		description:
			"Enjoy captivating made-for-television films featuring compelling stories, memorable characters, and cinematic experiences crafted for every occasion.",
	},
	{
		id: 53,
		name: "Thriller",
		description:
			"Feel the tension rise with gripping suspense, shocking twists, dangerous conspiracies, and relentless pacing that will keep you guessing until the very end.",
	},
	{
		id: 10752,
		name: "War",
		description:
			"Experience powerful stories of heroism, sacrifice, and survival set against the backdrop of history's greatest conflicts and the human cost of war.",
	},
	{
		id: 37,
		name: "Western",
		description:
			"Ride across untamed frontiers where fearless gunslingers, legendary outlaws, and timeless tales of justice define the spirit of the Wild West.",
	},
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

export const genresLabel = (id: number) => {
	if (!id) {
		return {
			label: "",
		};
	}

	return {
		label: genreList.find((item) => item.id === id)?.name ?? "",
	};
};
