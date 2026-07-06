"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

interface bannerListProps {
	src: string;
	alt: string;
}
const AuthHeroSection = ({ items }: { items: bannerListProps[] }) => {
	return (
		<Swiper
			className="h-full"
			slidesPerView={1}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			modules={[Autoplay]}
		>
			{items?.map((items, index) => (
				<SwiperSlide>
					<img
						className="w-full h-full object-cover "
						src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}/original${items.src}`}
						alt={items.alt}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default AuthHeroSection;
