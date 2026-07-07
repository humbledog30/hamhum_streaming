import BannerOverlay from "@/components/banner-overlay";
import { Button } from "@/components/ui/button";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useFormatRuntime } from "@/lib/hooks/useFormatRuntime";
import { Play, Plus, Share, Share2, Star } from "lucide-react";

const details = {
	adult: false,
	backdrop_path: "/zMwhWailP1WY7sb6AoE6b8ugoy.jpg",
	belongs_to_collection: null,
	budget: 0,
	genres: [
		{
			id: 12,
			name: "Adventure",
		},
		{
			id: 16,
			name: "Animation",
		},
		{
			id: 10751,
			name: "Family",
		},
		{
			id: 14,
			name: "Fantasy",
		},
	],
	homepage: "https://www.netflix.com/title/81749852",
	id: 1007757,
	imdb_id: "tt29552248",
	origin_country: ["US"],
	original_language: "en",
	original_title: "Swapped",
	overview:
		"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically trade places and set off on an adventure of a lifetime to switch back. Their journey soon uncovers a greater threat—one that could endanger not only their species, but the entire valley they call home.",
	popularity: 90.9091,
	poster_path: "/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg",
	production_companies: [
		{
			id: 115416,
			logo_path: "/eP0uhxcvAl91Xfw5SBSGuCY6GVU.png",
			name: "Skydance Animation",
			origin_country: "US",
		},
		{
			id: 179999,
			logo_path: "/eP0uhxcvAl91Xfw5SBSGuCY6GVU.png",
			name: "Skydance Animation",
			origin_country: "ES",
		},
	],
	production_countries: [
		{
			iso_3166_1: "US",
			name: "United States of America",
		},
		{
			iso_3166_1: "ES",
			name: "Spain",
		},
	],
	release_date: "2026-05-01",
	revenue: 0,
	runtime: 102,
	softcore: false,
	spoken_languages: [
		{
			english_name: "English",
			iso_639_1: "en",
			name: "English",
		},
	],
	status: "Released",
	tagline: "Transform your destiny.",
	title: "Swapped",
	video: false,
	vote_average: 8.945,
	vote_count: 1875,
};

const InfoPage = ({}) => {
	return (
		<div className="w-full h-fit md:h-[calc(100dvh-4rem)] min-h-150 relative overflow-hidden">
			{/* Info page Banner section */}
			<div className="w-full h-full relative">
				<img
					className="w-full h-full object-cover absolute z-0"
					src={`${useFormatImagePath(details.backdrop_path)}`}
					alt={`${details.title} Backdrop`}
				/>
				<BannerOverlay />
				<div className="container px-5 h-full z-20 mx-auto relative flex item items-end gap-5 md:gap-8 flex-wrap py-20">
					<img
						className="aspect-2/3 h-50 sm:h-70 md:h-80 lg:h-90 object-cover border rounded-xl border-primary"
						src={`${useFormatImagePath(details.poster_path)}`}
						alt={details.title}
					/>
					<div className="flex-1 flex-col flex gap-3">
						<h1 className="text-5xl md:text-6xl uppercase font-fraunces font-semibold">
							{details.title}
						</h1>
						<div className="flex gap-3 text-xs text-foreground/80 items-center">
							<span className="border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-md font-semibold font-inter">
								R
							</span>
							<span>{details.release_date.split("-")[0]}</span>
							<span>{useFormatRuntime(details.runtime)}</span>
							<span className="flex gap-1 items-center font-medium text-primary dark:text-yellow-400">
								<Star size={14} />
								{details.vote_average.toPrecision(2)}
							</span>
						</div>
						<div className="flex gap-1">
							{details.genres.map((genre, index) => {
								return (
									<span
										className="text-xs border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-2xl opacity-70 font-light"
										key={`genre-${genre.id}`}
									>
										{genre.name}
									</span>
								);
							})}
						</div>
						<p className="max-w-full md:max-w-200">{details.overview}</p>
						<div className="flex gap-2 items-center mt-5 flex-wrap">
							<Button className=" px-6 rounded-3xl h-11" variant={"default"}>
								<Play /> Watch Now
							</Button>
							<Button
								className=" px-6 bg-background/40 rounded-3xl h-11"
								variant={"outline"}
							>
								<Plus /> Add to list
							</Button>
							<Button
								className="bg-background/40 rounded-full size-11"
								size={"icon"}
								variant={"outline"}
							>
								<Share2 />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoPage;
