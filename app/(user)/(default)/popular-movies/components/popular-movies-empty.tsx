import { CalendarClock } from "lucide-react";
import { NextPage } from "next";

interface Props {}

const PopuluMoviesEmpty = ({}) => {
	return (
		<div className="flex flex-col gap-3 items-center justify-center py-10 max-w-150 mx-auto">
			<p className="text-lg lg:text-xl font-fraunces font-semibold">The Spotlight Is Empty</p>
			<p className="text-muted-foreground text-center text-sm text-pretty">
				No movies are trending at the moment. We'll refresh this list as new audience
				favorites emerge.
			</p>
		</div>
	);
};

export default PopuluMoviesEmpty;
