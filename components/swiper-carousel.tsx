"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ComponentType, RefObject } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MovieDetailsRow } from "@/types/movie";
import { SwiperOptions } from "swiper/types";

interface CardProps {
	item: MovieDetailsRow;
	index: number;
}

interface SwiperCarouselProps {
	data: MovieDetailsRow[] | null | undefined;
	isLoading?: boolean;
	Card: ComponentType<CardProps>;
	SkeletonCard?: ComponentType;
	skeletonCount?: number;
	navigation: {
		prevRef: RefObject<HTMLButtonElement | null>;
		nextRef: RefObject<HTMLButtonElement | null>;
	};
	slidesPerView?: number;
	spaceBetween?: number;
	breakpoints?: SwiperOptions["breakpoints"];
}

const SwiperCarousel = ({
	data,
	isLoading,
	Card,
	SkeletonCard,
	skeletonCount = 8,
	navigation,
	slidesPerView = 1,
	spaceBetween = 10,
	breakpoints = {
		640: { slidesPerView: 3, spaceBetween: 10 },
		1024: { slidesPerView: 4.5, spaceBetween: 20 },
	},
}: SwiperCarouselProps) => {
	const { prevRef, nextRef } = navigation;

	if (isLoading) {
		if (!SkeletonCard) return null;

		const Skeleton = SkeletonCard;
		return (
			<Swiper
				modules={[Navigation]}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				breakpoints={breakpoints}
				allowTouchMove={false}
			>
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<SwiperSlide key={`skeleton-${i}`}>
						<Skeleton />
					</SwiperSlide>
				))}
			</Swiper>
		);
	}
	if (!data) {
		return null;
	}

	const movieData = data.slice(0, 8);
	return (
		<Swiper
			modules={[Navigation]}
			slidesPerView={slidesPerView}
			spaceBetween={spaceBetween}
			breakpoints={breakpoints}
			navigation={{
				prevEl: prevRef.current,
				nextEl: nextRef.current,
			}}
			onBeforeInit={(swiper) => {
				if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}
			}}
		>
			{movieData.map((item, index) => (
				<SwiperSlide key={item.id}>
					<Card item={item} index={index} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperCarousel;
