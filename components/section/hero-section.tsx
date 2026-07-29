"use client";

import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { MovieAdditionalProp, MovieAdditionalPropRestructure } from "@/types/movie";
import BannerSlide from "../banner-slide";

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

const slides: MovieAdditionalPropRestructure[] = [
	{
		id: "538cc83b-cf53-4965-b146-d9fc9edf518d",
		backdrop_path: "https://image.tmdb.org/t/p/original/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg",
		title: "Toy Story 5",
		overview: `"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder when they have to go head to head with the all-new threat to playtime."`,
		rating: "PG",
		release_date: "2026",
		runtime: "2h 11m",
		vote_average: 7.4,
		genre_ids: [16, 10751, 35, 12],
	},
	{
		id: "b0dbbb63-2b4e-42ee-a986-73943d7a90ea",
		backdrop_path: "https://image.tmdb.org/t/p/original/zMwhWailP1WY7sb6AoE6b8ugoy.jpg",
		title: "Swapped",
		overview:
			"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically trade places and set off on an adventure of a lifetime to switch back. Their journey soon uncovers a greater threat—one that could endanger not only their species, but the entire valley they call home.",
		rating: "PG",
		release_date: "2026",
		runtime: "2h 11m",
		vote_average: 8.944,
		genre_ids: [12, 16, 10751, 14],
	},
];

const HeroSection = ({}) => {
	const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

	const paginationRef = useCallback((node: HTMLDivElement | null) => {
		setPaginationEl(node);
	}, []);
	return (
		<div className="w-full h-[calc(100dvh-64px)] max-h-250 min-h-150 relative overflow-hidden">
			<Swiper
				modules={[Autoplay, EffectFade, Pagination]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				loop
				autoplay={{ delay: 6000, disableOnInteraction: false }}
				pagination={{
					el: paginationEl,
					clickable: true,
					bulletClass: "hero-bullet",
					bulletActiveClass: "hero-bullet-active",
					renderBullet: (index, className) => `
						<div class="${className}">
							<img src="${slides[index].backdrop_path}" alt="${slides[index].title}" class="hero-bullet-bg"/>
							<span class="hero-bullet-fill"></span>
						</div>
					`,
				}}
				onSlideChangeTransitionStart={() => {
					document
						.querySelectorAll<HTMLElement>(".hero-bullet-fill")
						.forEach((el) => (el.style.width = "0%"));
				}}
				onAutoplayTimeLeft={(_swiper, _time, progress) => {
					const fill = document.querySelector<HTMLElement>(
						".hero-bullet-active .hero-bullet-fill",
					);
					if (fill) fill.style.width = `${(1 - progress) * 100}%`;
				}}
				className="w-full h-full"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<BannerSlide item={slide} />
					</SwiperSlide>
				))}
			</Swiper>
			<div
				ref={paginationRef}
				className="section-container hero-pagination absolute left-1/2 -translate-x-1/2 top-5 z-30 flex gap-2 justify-end"
			/>
		</div>
	);
};

export default HeroSection;
