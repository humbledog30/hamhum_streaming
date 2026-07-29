"use client";
import PopularMoviesLoading from "./popular-page-skeleton";
import { usePopularMovie } from "@/lib/queries/useMovieQuery";
import PageSectionHeader from "@/components/page-section-header";
import PopularMoviesContent from "./popular-movies-content";

const PopularMoviesPage = ({}) => {
	const { data, error, isLoading } = usePopularMovie();

	if (isLoading) {
		return <PopularMoviesLoading />;
	}
	if (error) {
		return <div>Failed to load movies.</div>;
	}

	return (
		<div>
			<PageSectionHeader
				tagline={"Ranked by Community Rating"}
				title={
					<>
						Popular <span className="italic text-muted-foreground">Movies</span>
					</>
				}
				description={
					"The titles Ham+Hum members are watching, rating, and talking about most — updated every day from real community votes."
				}
			/>
			<PopularMoviesContent data={data} />
		</div>
	);
};

export default PopularMoviesPage;
