"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { Dot, Plus } from "lucide-react";
import { FaPlay, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";

type Slide = {
	id: string;
	backdrop: string;
	title: string;
	overview: string;
	rating: string;
	year: number;
	runtime: string;
	vote_average: number;
	genres: number[];
};

const slides: Slide[] = [
	{
		id: "1084244",
		backdrop: "https://image.tmdb.org/t/p/original/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg",
		title: "Toy Story 5",
		overview: `"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder when they have to go head to head with the all-new threat to playtime."`,
		rating: "PG",
		year: 2026,
		runtime: "2h 11m",
		vote_average: 7.4,
		genres: [16, 10751, 35, 12],
	},
	{
		id: "1007757",
		backdrop: "https://image.tmdb.org/t/p/original/zMwhWailP1WY7sb6AoE6b8ugoy.jpg",
		title: "Swapped",
		overview:
			"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically trade places and set off on an adventure of a lifetime to switch back. Their journey soon uncovers a greater threat—one that could endanger not only their species, but the entire valley they call home.",
		rating: "PG",
		year: 2026,
		runtime: "2h 11m",
		vote_average: 8.944,
		genres: [12, 16, 10751, 14],
	},
];

const HeroSection = ({}) => {
	const fillTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	return (
		<div className="w-full h-[calc(100dvh-64px)] min-h-150 relative overflow-hidden">
			<Swiper
				modules={[Autoplay, EffectFade, Pagination]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				loop
				autoplay={{ delay: 6000, disableOnInteraction: false }}
				pagination={{
					el: ".hero-pagination",
					clickable: true,
					bulletClass: "hero-bullet",
					bulletActiveClass: "hero-bullet-active",
					renderBullet: (index, className) => `
						<div class="${className}">
							<img src="${slides[index].backdrop}" alt="${slides[index].title}" class="hero-bullet-bg"/>
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
						<div className="w-full h-full relative">
							<img
								className="w-full h-full object-cover absolute z-0"
								src={slide.backdrop}
								alt={slide.title}
							/>
							<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%)]" />
							<div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.05)_0%,hsl(var(--background)/0.55)_58%,hsl(var(--background)/1)_100%)]" />
							<div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.75)_0%,hsl(var(--background)/0.15)_45%,hsl(var(--background)/0.05)_70%)]" />

							<div className="container px-5 h-full z-20 mx-auto relative flex flex-col justify-end pb-10">
								<div className="py-5 border-b border-muted-foreground">
									<div className="mb-4 font-jetbrains-mono text-xs flex gap-1 items-center text-red-500">
										<div className="relative">
											<Dot className="scale-[2] animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
											<Dot className="scale-[2]" />
										</div>
										<span>NOW STREAMING</span>
									</div>
									<div className="meta-information flex-wrap flex gap-3 mb-4 items-center text-muted-foreground">
										<div className="flex gap-3 border-r border-transparent sm:border-muted-foreground pr-3">
											<span className="border p-1 px-2.5 rounded-md text-xs border-foreground">
												{slide.rating}
											</span>
											<span>{slide.year}</span>
											<span>{slide.runtime}</span>
											<span className="flex items-center gap-1 text-sm text-primary dark:text-yellow-400">
												<FaStar />
												{slide.vote_average.toPrecision(2)}
											</span>
										</div>
										<div className="flex gap-3">
											{slide.genres.map((genre, index) => {
												const { label } = useGenresLabel(genre);
												return (
													<span key={`genre-banner-${genre}-${slide.id}`}>
														{label}
													</span>
												);
											})}
										</div>
									</div>
									<p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-fraunces text-foreground transition-all duration-250 font-bold">
										{slide.title}
									</p>
								</div>
								<div className="flex justify-between flex-wrap items-end gap-5 py-5">
									<p className="italic text-muted-foreground max-w-full md:max-w-[75%]">
										{slide.overview}
									</p>
									<div className="action-buttons flex gap-3 flex-wrap">
										<Button size="lg" className="rounded-3xl py-6">
											<FaPlay /> Watch now
										</Button>
										<Button
											size="lg"
											className="bg-transparent border-foreground rounded-3xl py-6"
											variant="outline"
										>
											<Plus /> Add to list
										</Button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="container mx-auto hero-pagination absolute left-1/2 -translate-x-1/2 top-5 z-30 flex gap-2 px-5 justify-end" />
		</div>
	);
};

export default HeroSection;
