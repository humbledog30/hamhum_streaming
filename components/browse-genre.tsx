import { NextPage } from "next";
import SwiperCarousel from "./swiper-carousel";

interface Props {}

const BrowseGenre: NextPage<Props> = ({}) => {
	return (
		<section className="p-5 container flex flex-col gap-5 mx-auto">
			<h6 className="section-title flex gap-3 items-center">
				Trending Now
				<span className="text-muted-foreground text-[10px] px-1 py-0.5 rounded-sm border border-muted-foreground opacity-35">
					TODAY
				</span>
			</h6>
			<div>
				<SwiperCarousel />
			</div>
		</section>
	);
};

export default BrowseGenre;
