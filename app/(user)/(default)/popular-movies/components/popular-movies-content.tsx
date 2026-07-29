"use client";

import { Separator } from "@/components/ui/separator";
import { MovieDetailsRow } from "@/types/movie";
import PopuluMoviesEmpty from "./popular-movies-empty";
import PopularMoviesTop3 from "./popular-movies-top3";
import PopularMoviesRemaining from "./popular-movies-remaining";

const PopularMoviesContent = ({ data }: { data: MovieDetailsRow[] | null | undefined }) => {
	if (!data) {
		return <PopuluMoviesEmpty />;
	}

	const top3 = data?.slice(0, 3);
	const remainingData = data?.slice(3);
	return (
		<section className=" mx-auto section-container py-8 flex flex-col gap-10">
			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">This Week's Highest Rated</p>
				<Separator className="flex-1" />
			</div>

			<PopularMoviesTop3 data={top3} />

			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">Also trending</p>
				<Separator className="flex-1" />
			</div>

			<PopularMoviesRemaining data={remainingData} />
		</section>
	);
};

export default PopularMoviesContent;
