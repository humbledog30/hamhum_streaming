"use client";
import { Calendar, MoveRight } from "lucide-react";
import UpcomingCard from "../upcoming-card";
import { useUpcomingRelease } from "@/lib/queries/useMovieQuery";
import Link from "next/link";
import { Separator } from "../ui/separator";

const UpcomingSection = ({}) => {
	const { data, error, isLoading } = useUpcomingRelease();

	if (error) {
		return null;
	}
	return (
		<section className="py-5 section-container">
			<div className="flex gap-5 flex-col">
				<div className="flex items-center gap-5">
					<h6 className="section-title text-nowrap flex items-center gap-3">
						Upcoming Releases
					</h6>
					<Separator className="flex-1" />
					<Link
						href="/upcoming-releases"
						className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
					>
						See all
						<MoveRight size={16} />
					</Link>
				</div>

				<UpcomingCard items={data} isLoading={isLoading} />
			</div>
		</section>
	);
};

export default UpcomingSection;
