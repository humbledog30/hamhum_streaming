"use client";
import { NextPage } from "next";
// import SwiperCarousel from "../swiper-carousel";
import PopularCards from "../popular-cards";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, MoveRight, Star } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePopularMovie } from "@/lib/queries/useMovieQuery";
import TrendingCardSkeleton, { PopularCardSkeleton } from "../skeleton-loader/homepage-skeleton";
import dynamic from "next/dynamic";

const SwiperCarousel = dynamic(() => import("@/components/swiper-carousel"), {
	ssr: false,
	loading: () => (
		<div className="flex gap-5 overflow-hidden">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="w-40 shrink-0">
					<PopularCardSkeleton />
				</div>
			))}
		</div>
	),
});
const PopularSection = ({}) => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	const { data, isLoading, error } = usePopularMovie();
	if (error) {
		return null;
	}
	return (
		<section className="py-5 section-container">
			<div className="flex gap-5 flex-col">
				<div className="flex justify-between items-center gap-5 flex-wrap">
					<h6 className="section-title flex gap-3 items-center ">Popular Movies</h6>
					<Separator className="flex-1" />
					<div className="flex gap-2 ">
						<Link
							href="/popular-movies"
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
						SkeletonCard={PopularCardSkeleton}
						Card={PopularCards}
						isLoading={isLoading}
						slidesPerView={2}
						navigation={{ prevRef, nextRef }}
						breakpoints={{
							640: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							1024: {
								slidesPerView: 5,
								spaceBetween: 20,
							},
							1200: {
								slidesPerView: 6,
								spaceBetween: 20,
							},
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default PopularSection;
