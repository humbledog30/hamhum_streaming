"use client";
import { useRef } from "react";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Flame, MoveRight } from "lucide-react";
import Link from "next/link";
import SwiperCarousel from "../swiper-carousel";
import TrendingCard from "../trending-card";
import { usePopularMovie } from "@/lib/queries/useMovieQuery";
import TrendingCardSkeleton from "../skeleton-loader/homepage-skeleton";

const movieData = [
	{
		adult: false,
		backdrop_path: "/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg",
		genre_ids: [16, 10751, 35, 12],
		id: 1084244,
		title: "Toy Story 5",
		original_language: "en",
		original_title: "Toy Story 5",
		overview:
			"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder when they have to go head to head with the all-new threat to playtime.",
		popularity: 527.9757,
		poster_path: "/pxG26JdyuiDvJbSoucknaFiLeZD.jpg",
		release_date: "2026-06-17",
		softcore: false,
		video: false,
		vote_average: 7.425,
		vote_count: 440,
	},
	{
		adult: false,
		backdrop_path: "/mCpwRayjXMFzKHbjbzc5JRKfq1O.jpg",
		genre_ids: [27, 9648, 878],
		id: 1083381,
		title: "Backrooms",
		original_language: "en",
		original_title: "Backrooms",
		overview: "A strange doorway appears in the basement of a furniture showroom.",
		popularity: 543.8897,
		poster_path: "/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg",
		release_date: "2026-05-27",
		softcore: false,
		video: false,
		vote_average: 6.859,
		vote_count: 852,
	},
	{
		adult: false,
		backdrop_path: "/xWBiXclrRmTggQHMRsIn84YHavs.jpg",
		genre_ids: [35, 27],
		id: 1273221,
		title: "Scary Movie",
		original_language: "en",
		original_title: "Scary Movie",
		overview:
			"Twenty-six years after outrunning a suspiciously familiar masked killer, the Core Four are back in the killer's crosshairs and no horror movie IP is safe.",
		popularity: 527.2744,
		poster_path: "/1KlYdWoOrbL5ux357rW9LC155qw.jpg",
		release_date: "2026-06-03",
		softcore: false,
		video: false,
		vote_average: 5.422,
		vote_count: 403,
	},
	{
		adult: false,
		backdrop_path: "/2flMSJfRSZ8OWdPjZEz2kJatBLm.jpg",
		genre_ids: [28, 35, 12, 80],
		id: 1169516,
		title: "Welcome to the Jungle",
		original_language: "hi",
		original_title: "Welcome to the Jungle",
		overview:
			"A group of quirky characters gets stuck in a dangerous jungle during a chaotic mission. Filled with confusion, criminals, and hilarious situations, they must work together to survive and find their way out.",
		popularity: 243.8251,
		poster_path: "/1JlfUuvvX5xLP2LIDah4JhWUtTx.jpg",
		release_date: "2026-06-25",
		softcore: false,
		video: false,
		vote_average: 5.206,
		vote_count: 17,
	},
	{
		adult: false,
		backdrop_path: "/iYjlQzWbcFIjWe2WifbEPb4kErp.jpg",
		genre_ids: [27, 53],
		id: 1127384,
		title: "Deep Water",
		original_language: "en",
		original_title: "Deep Water",
		overview:
			"A group of international passengers on a flight from Los Angeles to Shanghai is forced to make an emergency landing in shark-infested waters. The terrified group is forced to work together and overcome their differences if they hope to escape their sinking plane and the frenzy of sharks drawn to the wreckage.",
		popularity: 275.4749,
		poster_path: "/kjcuS7xaRyqRjVaVcH4t0qHshuX.jpg",
		release_date: "2026-04-30",
		softcore: false,
		video: false,
		vote_average: 6.065,
		vote_count: 77,
	},
	{
		adult: false,
		backdrop_path: "/Af907x5h9W1wVis8XrSd7ynTWuy.jpg",
		genre_ids: [35, 18],
		id: 1314481,
		title: "The Devil Wears Prada 2",
		original_language: "en",
		original_title: "The Devil Wears Prada 2",
		overview:
			"Andy Sachs returns to Runway as Miranda Priestly navigates a new media landscape and Runway's position within. The duo reconnect with former assistant Emily Charlton, now the head of a luxury brand that possesses funding which could ensure Runway's survival.",
		popularity: 290.5058,
		poster_path: "/fCAURTUx3YfsJ8k9I0UamjSILiR.jpg",
		release_date: "2026-04-29",
		softcore: false,
		video: false,
		vote_average: 6.911,
		vote_count: 1147,
	},
];

const Trending = ({}) => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const { data, isLoading, error } = usePopularMovie();
	if (error) {
		return null;
	}
	return (
		<section className="py-5 section-container flex flex-col gap-5">
			<div className="flex justify-between items-center gap-5 flex-wrap ">
				<h6 className="section-title flex gap-3 items-center ">
					<Flame /> Trending Now
				</h6>
				<div className="border-b border-foreground/80 flex-1"></div>
				<div className="flex gap-2 ">
					<Link
						href="#"
						className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
					>
						See all
						<MoveRight size={16} />
					</Link>
					<button
						type="button"
						ref={prevRef}
						className="border border-foreground rounded-full p-2 hover:opacity-100 opacity-60 transition"
					>
						<ChevronLeft size={14} />
					</button>
					<button
						type="button"
						ref={nextRef}
						className="border border-foreground rounded-full p-2 hover:opacity-100 opacity-60 transition"
					>
						<ChevronRight size={14} />
					</button>
				</div>
			</div>
			<div>
				<SwiperCarousel
					data={data}
					isLoading={isLoading}
					SkeletonCard={TrendingCardSkeleton}
					Card={TrendingCard}
					navigation={{ prevRef, nextRef }}
				/>
			</div>
		</section>
	);
};

export default Trending;
