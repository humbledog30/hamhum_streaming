"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaStar } from "react-icons/fa6";
import { RefObject } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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
export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	softcore: boolean;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
interface SwiperCarouselProps {
	navigation: {
		prevRef: RefObject<HTMLButtonElement | null>;
		nextRef: RefObject<HTMLButtonElement | null>;
	};
}
const SwiperCarousel = ({ navigation }: SwiperCarouselProps) => {
	const { prevRef, nextRef } = navigation;
	return (
		<Swiper
			modules={[Navigation]}
			spaceBetween={10}
			slidesPerView={1}
			onSlideChange={() => console.log("slide change")}
			navigation={{
				prevEl: prevRef.current,
				nextEl: nextRef.current,
			}}
			onSwiper={(swiper) => {}}
			onBeforeInit={(swiper) => {
				console.log("prevRef.current:", prevRef.current);
				console.log("nextRef.current:", nextRef.current);
				if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}
			}}
			breakpoints={{
				640: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				1024: {
					slidesPerView: 4.5,
					spaceBetween: 20,
				},
			}}
		>
			{movieData.map((item: Movie, index: number) => {
				return (
					<SwiperSlide>
						<div className="relative rounded-lg overflow-hidden border">
							<span className="absolute top-3 z-20 left-3 font-fraunces text-2xl font-bold text-shadow-2xs">
								{index + 1}
							</span>
							<img
								className="relative z-0 w-full h-full object-cover"
								src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}/w500/${item.backdrop_path}`}
								alt=""
							/>
							<div className=" text-foreground flex flex-col gap-1 absolute top-0 left-0 w-full h-full z-20 justify-end p-5 bg-[linear-gradient(0deg,hsl(var(--background)/1)_0%,hsl(var(--background)/0.05)_60%)]">
								<p className="font-fraunces text-xl font-medium">{item.title}</p>
								<div className="text-[10px] flex gap-2 items-center opacity-80">
									<span className="flex items-center gap-1 ">
										<FaStar className="text-[8px]" />
										{item.vote_average.toPrecision(2)}
									</span>
									<span>{item?.release_date.split("-")[0]}</span>
									<span>Movie</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default SwiperCarousel;
