import { Movie } from "@/types/movie";
import MovieCard from "./movie-card";
import { Dispatch, SetStateAction } from "react";
import EmptyResult from "./empty-result";
import EmptyState from "./empty-state";

const MovieGridSection = ({
	searchKey,
	dataResult,
	setSelectedMovie,
}: {
	searchKey: string;
	dataResult: Movie[];
	setSelectedMovie: Dispatch<SetStateAction<Movie | null>>;
}) => {
	if (!searchKey) {
		return <EmptyState />;
	}
	if (dataResult.length <= 0) {
		return <EmptyResult search={searchKey} />;
	}
	return dataResult?.map((item) => (
		<MovieCard key={item.id} item={item} onSelect={() => setSelectedMovie(item)} />
	));
};

export default MovieGridSection;
