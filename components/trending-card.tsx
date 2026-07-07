import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { Movie } from "@/types/movie";
import { NextPage } from "next";
import { FaStar } from "react-icons/fa6";

interface Props {}

const TrendingCard = ({ item, index }: { item: Movie; index: number }) => {
	return (
		<div className="relative rounded-lg overflow-hidden border">
			<span className="absolute top-3 z-20 left-3 font-fraunces text-2xl font-bold text-shadow-2xs">
				{index + 1}
			</span>
			<img
				className="relative z-0 w-full h-full object-cover"
				src={`${useFormatImagePath(item.backdrop_path, "w500")}`}
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
	);
};

export default TrendingCard;
