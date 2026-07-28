import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Slash } from "lucide-react";
import { NextPage } from "next";
import UpcomingContent from "./components/upcoming-content";

interface Props {}

const Page = async ({}) => {
	const currentYear = new Date().getFullYear();
	const supabase = await createClient();

	const today = new Date();
	const startDate = today.toISOString().split("T");

	const endOfYear = new Date(today.getFullYear(), 11, 31);
	const endDate = endOfYear.toISOString().split("T")[0];

	const { data: movies, error } = await supabase
		.from("movies")
		.select(
			`
            *,
            genres:movie_genres(genre:genres(id, tmdb_genre_name))
        `,
		)
		.gte("release_date", startDate)
		.lte("release_date", endDate)
		.eq("tmdb_status", "Post Production");

	if (error) {
		console.error(error);
		return <div>Failed to load movies.</div>;
	}
	return (
		<div>
			<section className="relative w-full">
				{/* <div className="absolute inset-0 bg-background">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_0%,hsl(var(--primary)/0.30),transparent_60%)]" />
					<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
				</div> */}
				<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
					<span className="flex items-center gap-3 font-semibold tracking-widest uppercase text-muted-foreground">
						<Slash className="rotate-45 text-primary" />
						Coming soon
					</span>

					<h1 className="max-w-200 text-6xl leading-16 font-fraunces font-semibold text-pretty">
						Upcoming <span className="italic text-muted-foreground">Releases</span>
					</h1>

					<p className="mt-4 max-w-150 text-lg text-muted-foreground">
						Everything landing on hamhum next — set a reminder and we'll let you know
						the moment it's ready to watch.
					</p>
				</div>
			</section>
			{/* <Separator /> */}
			<section className="max-w-200 mx-auto px-5 py-8 flex flex-col gap-10">
				<div className="flex gap-5 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
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

export default Page;
