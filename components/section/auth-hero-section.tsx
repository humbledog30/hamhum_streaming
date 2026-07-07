"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css/effect-fade";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";

interface bannerListProps {
	src: string;
	alt: string;
}

interface AuthHeroSectionProps {
	items: bannerListProps[];
	paginationEl: HTMLElement | null; // <-- actual DOM node, not a selector
}

const AuthHeroSection = ({ items, paginationEl }: AuthHeroSectionProps) => {
	// Don't mount Swiper until we actually have the pagination DOM node
	if (!paginationEl) return null;

	return (
		<Swiper
			className="h-full"
			slidesPerView={1}
			effect="fade"
			speed={800}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			observer
			observeParents
			pagination={{
				el: paginationEl,
				clickable: true,
				bulletClass: "hero-bullet",
				bulletActiveClass: "hero-bullet-active",
				renderBullet: (index, className) => `
						<div class="${className}">
							<img src="${useFormatImagePath(items[index].src)}" alt="${items[index].alt}" class="hero-bullet-bg"/>
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
			modules={[Autoplay, EffectFade, Pagination]}
		>
			{items?.map((item, index) => (
				<SwiperSlide key={item.src}>
					<img
						className="w-full h-full object-cover"
						src={`${useFormatImagePath(item.src)}`}
						alt={item.alt}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default AuthHeroSection;
