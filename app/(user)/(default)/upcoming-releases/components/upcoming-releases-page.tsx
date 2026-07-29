"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slash } from "lucide-react";

import { useUpcomingRelease } from "@/lib/queries/useMovieQuery";
import UpcomingReleasesLoading from "./upcoming-skeleton";
import UpcomingContent from "./upcoming-content";
import PageSectionHeader from "@/components/page-section-header";

const UpcomingReleasesPage = ({}) => {
	const currentYear = new Date().getFullYear();

	const { data: movies, error, isLoading } = useUpcomingRelease();

	if (isLoading) {
		return <UpcomingReleasesLoading />;
	}
	if (error) {
		return <div>Failed to load movies.</div>;
	}
	return (
		<div>
			<PageSectionHeader
				tagline="Coming soon"
				title={
					<>
						Upcoming <span className="italic text-muted-foreground">Releases</span>
					</>
				}
				description="Everything landing on hamhum next — set a reminder and we'll let you know the moment it's ready to watch."
			/>
			<section className="py-8 flex flex-col gap-10">
				<div className="section-container flex gap-5 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
					<p>This Year's Lineup </p>
					<Separator className="flex-1" />
					<Badge
						className="rounded-2xl font-inter p-1.5 px-4 text-muted-foreground bg-accent/30"
						variant={"outline"}
					>
						{currentYear}
					</Badge>
				</div>
				<UpcomingContent data={movies} />
			</section>
		</div>
	);
};

export default UpcomingReleasesPage;
