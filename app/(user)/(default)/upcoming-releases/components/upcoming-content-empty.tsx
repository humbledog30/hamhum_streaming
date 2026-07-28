import { CalendarClock } from "lucide-react";
import { NextPage } from "next";

interface Props {}

const UpcomingContentEmpty = ({}) => {
	return (
		<div className="flex flex-col gap-3 items-center justify-center py-10 max-w-150 mx-auto">
			<p className="text-lg lg:text-xl font-fraunces font-semibold">
				The Next Premiere Awaits
			</p>
			<p className="text-muted-foreground text-center text-sm text-pretty">
				There aren't any upcoming releases to show just yet. Stay tuned—new movies are added
				as soon as they're announced.
			</p>
		</div>
	);
};

export default UpcomingContentEmpty;
