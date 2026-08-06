import { NextPage } from "next";
import { BrowsePageSkeleton } from "./components/skeleton-loader/browse-page-skeleton";

interface Props {}

const Loading: NextPage<Props> = ({}) => {
	return <BrowsePageSkeleton />;
};

export default Loading;
