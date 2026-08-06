import { NextPage } from "next";
import MovieInfoPageSkeleton from "../components/skeleton-loader/movie-info-page-skeleton";

interface Props {}

const Loading: NextPage<Props> = ({}) => {
	return <MovieInfoPageSkeleton />;
};

export default Loading;
