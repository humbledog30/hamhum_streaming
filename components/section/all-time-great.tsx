import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { Movie } from "@/types/movie";
import { Trophy } from "lucide-react";

const allTimeGreatData = [
	{
		adult: false,
		backdrop_path: "/zMwhWailP1WY7sb6AoE6b8ugoy.jpg",
		genre_ids: [12, 16, 10751, 14],
		id: 1007757,
		title: "Swapped",
		original_language: "en",
		original_title: "Swapped",
		overview:
			"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically trade places and set off on an adventure of a lifetime to switch back. Their journey soon uncovers a greater threat—one that could endanger not only their species, but the entire valley they call home.",
		popularity: 101.6538,
		poster_path: "/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg",
		release_date: "2026-05-01",
		softcore: false,
		video: false,
		vote_average: 8.944,
		vote_count: 1862,
	},
	{
		adult: false,
		backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
		genre_ids: [18, 80],
		id: 278,
		title: "The Shawshank Redemption",
		original_language: "en",
		original_title: "The Shawshank Redemption",
		overview:
			"Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
		popularity: 163.6421,
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		release_date: "1994-09-23",
		softcore: false,
		video: false,
		vote_average: 8.724,
		vote_count: 30692,
	},
	{
		adult: false,
		backdrop_path: "/ufSwlnECLoUbBjPrFqEQcWBzHwc.jpg",
		genre_ids: [10402, 18],
		id: 936075,
		title: "Michael",
		original_language: "en",
		original_title: "Michael",
		overview:
			"The story of Michael Jackson, one of the most influential artists the world has ever known, and his life beyond the music. His journey from the discovery of his extraordinary talent as the lead of the Jackson Five, to the visionary artist whose creative ambition fueled a relentless pursuit to become the biggest entertainer in the world, highlighting both his life off-stage and some of the most iconic performances from his early solo career.",
		popularity: 219.5762,
		poster_path: "/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg",
		release_date: "2026-04-22",
		softcore: false,
		video: false,
		vote_average: 8.704,
		vote_count: 3293,
	},
	{
		adult: false,
		backdrop_path: "/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
		genre_ids: [18, 80],
		id: 238,
		title: "The Godfather",
		original_language: "en",
		original_title: "The Godfather",
		overview:
			"Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
		popularity: 42.0762,
		poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
		release_date: "1972-03-14",
		softcore: false,
		video: false,
		vote_average: 8.687,
		vote_count: 23112,
	},
	{
		adult: false,
		backdrop_path: "/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
		genre_ids: [878, 12],
		id: 687163,
		title: "Project Hail Mary",
		original_language: "en",
		original_title: "Project Hail Mary",
		overview:
			"Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of who he is or how he got there. As his memory returns, he begins to uncover his mission: solve the riddle of the mysterious substance causing the sun to die out. He must call on his scientific knowledge and unorthodox ideas to save everything on Earth from extinction.",
		popularity: 157.6035,
		poster_path: "/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
		release_date: "2026-03-15",
		softcore: false,
		video: false,
		vote_average: 8.678,
		vote_count: 5683,
	},
	{
		adult: false,
		backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
		genre_ids: [18, 80],
		id: 240,
		title: "The Godfather Part II",
		original_language: "en",
		original_title: "The Godfather Part II",
		overview:
			"In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
		popularity: 28.6034,
		poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
		release_date: "1974-12-20",
		softcore: false,
		video: false,
		vote_average: 8.571,
		vote_count: 14015,
	},
	{
		adult: false,
		backdrop_path: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
		genre_ids: [18, 36, 10752],
		id: 424,
		title: "Schindler's List",
		original_language: "en",
		original_title: "Schindler's List",
		overview:
			"The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
		popularity: 27.9331,
		poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
		release_date: "1993-12-15",
		softcore: false,
		video: false,
		vote_average: 8.6,
		vote_count: 17576,
	},
	{
		adult: false,
		backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
		genre_ids: [18],
		id: 389,
		title: "12 Angry Men",
		original_language: "en",
		original_title: "12 Angry Men",
		overview:
			"The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
		popularity: 25.2575,
		poster_path: "/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg",
		release_date: "1957-04-10",
		softcore: false,
		video: false,
		vote_average: 8.564,
		vote_count: 10091,
	},
];
const AllTimeGreat = ({}) => {
	return (
		<section className="py-5 section-container">
			<div className="flex gap-5 flex-col">
				<div className="flex justify-between items-center gap-5 flex-wrap">
					<h6 className="section-title flex gap-3 items-center ">
						<Trophy /> All Time Great
					</h6>
					<div className="border-b border-foreground/80 flex-1"></div>
				</div>
				<div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 gap-x-16">
					{allTimeGreatData.map((item: Movie, index: number) => {
						return (
							<div
								key={`all-time-great${item.id}`}
								className="flex items-center pl-8 relative border-b border-foreground/20 pb-5"
							>
								<span className="absolute -z-1 text-stroke font-bold text-7xl left-0 font-fraunces text-s opacity-40">
									{index + 1}
								</span>
								<img
									className="w-25 rounded-lg"
									src={`${useFormatImagePath(item.poster_path)}`}
									alt={item.title}
								/>
								<div className="px-5 flex flex-col gap-3">
									<p className="font-fraunces font-semibold text-xl">
										{item.title}
									</p>
									<div className="flex gap-3 flex-wrap text-xs uppercase">
										{item.genre_ids.map((genre, genreIndex) => {
											const { label } = useGenresLabel(genre);
											return (
												<span
													key={`genre-${genreIndex}`}
													className="border p-1 px-2 rounded-md text-foreground/50 border-foreground/40"
												>
													{label}
												</span>
											);
										})}
									</div>
								</div>
								<div className="flex flex-col ml-auto items-end">
									<span className="text-primary text-2xl font-fraunces font-bold">
										{item.vote_average.toPrecision(2)}
									</span>
									<span className="text-sm -mt-1">/10</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AllTimeGreat;
