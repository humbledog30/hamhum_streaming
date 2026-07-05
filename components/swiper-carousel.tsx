"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ComponentType, RefObject } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Movie } from "@/types/movie";
import { SwiperOptions } from "swiper/types";

interface CardProps {
	item: Movie;
	index: number;
}

interface SwiperCarouselProps {
	data: Movie[];
	Card: ComponentType<CardProps>;
	navigation: {
		prevRef: RefObject<HTMLButtonElement | null>;
		nextRef: RefObject<HTMLButtonElement | null>;
	};

	// Swiper customization
	slidesPerView?: number;
	spaceBetween?: number;
	breakpoints?: SwiperOptions["breakpoints"];
}
const SwiperCarousel = ({
	data,
	Card,
	navigation,
	slidesPerView = 1,
	spaceBetween = 10,
	breakpoints = {
		640: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 4.5,
			spaceBetween: 20,
		},
	},
}: SwiperCarouselProps) => {
	const { prevRef, nextRef } = navigation;

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
			{data.map((item, index) => (
				<SwiperSlide key={item.id}>
					<Card item={item} index={index} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperCarousel;
